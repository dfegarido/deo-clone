import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

/**
 * Returns a process-wide MySQL connection pool. The first call reads the
 * connection settings from environment variables; subsequent calls reuse
 * the same pool (Vercel keeps the function instance warm).
 *
 * Required env vars (set in Vercel → Project Settings → Environment Variables):
 *   DB_HOST     e.g. 137.220.58.223
 *   DB_USER     e.g. root
 *   DB_PASSWORD
 *   DB_NAME     e.g. EVOLUTRA_EVENT_DB
 *   DB_PORT     optional, defaults to 3306
 */
export function getPool(): mysql.Pool {
  if (pool) return pool;
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 5,
    // Reasonable timeouts so a serverless invocation fails fast instead
    // of burning through the 10s default execution budget.
    connectTimeout: 5_000,
    enableKeepAlive: true,
  });
  // Dev-only: log every query that goes through the pool so you can see
  // exactly which SQL is hitting the MySQL server. Disabled in production.
  if (process.env.NODE_ENV !== 'production') {
    console.log(
      `[db] pool created → ${process.env.DB_USER}@${process.env.DB_HOST}:${process.env.DB_PORT ?? 3306}/${process.env.DB_NAME}` +
        (process.env.DB_HOST ? ' (live MySQL)' : ' (mock fallback)'),
    );
  }
  return pool;
}
