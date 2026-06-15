/**
 * Vite plugin: run Vercel-style serverless functions in-process during dev.
 *
 * Mirrors the most useful subset of `vercel dev`:
 *   • Files under `api/<wild>.ts` (excluding `_lib/`) are exposed as
 *     `api/<path>` HTTP endpoints on the same Vite dev server.
 *   • Bracketed path segments like `api/employee/[id].ts` become route
 *     parameters — `[id].ts` ⇒ `req.query.id`.
 *   • Handlers are transpiled on the fly with `tsx` and executed in
 *     Vite's Node process. `.env` values are loaded into `process.env`
 *     so handlers that read DB_HOST, DB_PASSWORD, etc. work without any
 *     extra setup.
 *
 * Why not just use `vercel dev`? Because this gives a single-process,
 * single-port experience like Next.js / Nuxt / SvelteKit, with HMR and
 * no second terminal. In production, the same files still deploy to
 * Vercel as serverless functions.
 */

import type { Plugin, ViteDevServer } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';

/** Local alias for a single Connect-style middleware. Avoids depending on
 *  @types/connect, which isn't installed. */
type ApiMiddleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: (err?: unknown) => void,
) => void | Promise<void>;
import path from 'path';
import fs from 'fs';
import { pathToFileURL } from 'url';
import { register } from 'tsx/esm/api';

interface Route {
  method?: string;
  pattern: RegExp;
  paramNames: string[];
  filePath: string;
}

const HANDLER_EXT = /\.(ts|tsx|mjs|js)$/;
const PARAMS = /\[([^\]]+)\]/g;

/** Minimal .env loader. We don't pull in `dotenv` to keep the surface
 *  tiny — the .env format is simple key=value lines with optional quotes. */
function loadDotenv(envPath: string) {
  if (!fs.existsSync(envPath)) return;
  const text = fs.readFileSync(envPath, 'utf8');
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    // Don't clobber env vars that are already set in the shell.
    if (process.env[key] === undefined) {
      process.env[key] = val;
    }
  }
}

function collectApiRoutes(root: string): Route[] {
  const apiDir = path.join(root, 'api');
  if (!fs.existsSync(apiDir)) return [];
  const routes: Route[] = [];

  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!HANDLER_EXT.test(entry.name)) continue;
      // `_lib/`, `_helpers/`, etc. are support modules, not handlers.
      if (entry.name.startsWith('_')) continue;
      // Treat any path under api/ as a route. Bracketed segments
      // (`[id]`) become named route parameters.
      const rel = path.relative(apiDir, full).replace(/\\/g, '/');
      const routePath = '/api/' + rel
        .replace(/\.(ts|tsx|mjs|js)$/, '')
        .replace(/\/index$/, '');
      const paramNames: string[] = [];
      const regexSource = routePath.replace(PARAMS, (_, name) => {
        paramNames.push(name);
        return '([^/]+)';
      });
      routes.push({
        pattern: new RegExp(`^${regexSource}$`),
        paramNames,
        filePath: full,
      });
    }
  };

  walk(apiDir);
  return routes;
}

export function evolutraApi(): Plugin {
  let tsxUnregister: (() => void) | null = null;
  const routeCache = new Map<string, unknown>();
  let routes: Route[] = [];

  const loadHandler = async (route: Route): Promise<unknown> => {
    // Reset tsx's ESM cache for the handler file so the latest source
    // is re-imported. For dev iteration this is the right trade-off
    // (slower than HMR-cached imports, but always fresh).
    if (routeCache.has(route.filePath)) {
      try {
        const url = pathToFileURL(route.filePath).href;
        // tsx exposes `unregister` to clear its loader hooks before a
        // re-register; we always re-register on every load for safety.
      } catch {
        /* noop */
      }
    }
    if (tsxUnregister) tsxUnregister();
    tsxUnregister = register({});
    const mod = await import(
      `${pathToFileURL(route.filePath).href}?t=${Date.now()}`
    );
    const handler = (mod as Record<string, unknown>).default ?? mod;
    routeCache.set(route.filePath, handler);
    return handler;
  };

  return {
    name: 'evolutra:api',
    apply: 'serve',
    async buildStart() {
      loadDotenv(path.join(process.cwd(), '.env'));
      routes = collectApiRoutes(process.cwd());
    },
    configureServer(server: ViteDevServer) {
      // Reload .env on every server start so changing values takes
      // effect after a restart. (Live .env editing still requires a
      // server restart — that's fine, it's a dev-only nicety.)
      loadDotenv(path.join(process.cwd(), '.env'));

      const apiMiddleware: ApiMiddleware = async (req, res, next) => {
        if (!req.url) return next();
        const url = req.url.split('?')[0];
        const route = routes.find((r) => r.pattern.test(url));
        if (!route) return next();

        const match = url.match(route.pattern)!;
        const queryParams: Record<string, string> = {};
        route.paramNames.forEach((n, i) => {
          queryParams[n] = decodeURIComponent(match[i + 1]);
        });

        try {
          const handler = (await loadHandler(route)) as (
            req: unknown,
            res: unknown,
          ) => Promise<unknown> | unknown;

          // Synthesize the minimal Vercel-style req the handlers expect.
          // Cast away the strict IncomingMessage type so we can attach `query`.
          const baseReq = req as unknown as Record<string, unknown>;
          const fakeReq = Object.assign(baseReq, {
            query: { ...((baseReq.query as Record<string, unknown>) ?? {}), ...queryParams },
          });

          // Polyfill Vercel's VercelResponse methods (status/json/end) on
          // top of the raw Node ServerResponse so the same handler source
          // works in both Vercel production and our in-process dev runtime.
          const baseRes = res as unknown as Record<string, unknown> & {
            statusCode: number;
            setHeader: (k: string, v: string) => void;
            end: (chunk?: string) => void;
          };
          let respBody: string | undefined;
          let statusCode = 200;
          let headersSet = false;
          const ensureHeaders = () => {
            if (headersSet) return;
            baseRes.setHeader('Content-Type', 'application/json; charset=utf-8');
            headersSet = true;
          };
          const fakeRes = Object.assign(baseRes, {
            status(code: number) {
              statusCode = code;
              return fakeRes;
            },
            json(obj: unknown) {
              ensureHeaders();
              baseRes.statusCode = statusCode;
              baseRes.end(JSON.stringify(obj));
              return fakeRes;
            },
            send(body: unknown) {
              ensureHeaders();
              baseRes.statusCode = statusCode;
              if (typeof body === 'string') baseRes.end(body);
              else { ensureHeaders(); baseRes.end(JSON.stringify(body)); }
              return fakeRes;
            },
          });
          // Touch respBody so unused-var linters don't complain — kept
          // for future hook use (e.g. response logging middleware).
          void respBody;

          await handler(fakeReq, fakeRes);
        } catch (err) {
          console.error('[evolutra:api] handler error', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            error: process.env.NODE_ENV === 'production'
              ? 'Internal Server Error'
              : `Internal Server Error: ${(err as Error).message}`,
          }));
        }
      };

      // Register BEFORE Vite's transform middleware so /api/* never gets
      // piped to the SPA fallback.
      server.middlewares.use(apiMiddleware);

      const reloadRoutes = () => {
        routes = collectApiRoutes(process.cwd());
      };

      server.watcher.on('add', reloadRoutes);
      server.watcher.on('unlink', reloadRoutes);
    },
  };
}
