import type { EmployeeUser } from '../types/employee';

/**
 * Base URL for the employee profile API.
 *
 * Defaults to the Vercel serverless route at /api/employee, which works
 * on both Vercel (production) and `vercel dev` (local development). For
 * a Vite-only local setup (`npm run dev` with no Vercel CLI), set
 * VITE_PROFILE_API to a full URL like http://localhost:3000/api/employee
 * — the Vercel dev server runs on port 3000 by default.
 */
const API_BASE: string =
  ((import.meta.env.VITE_PROFILE_API as string | undefined) ?? '/api/employee').replace(
    /\/+$/,
    '',
  );

/**
 * Strip a leading "+91" or "91" country code from an Indian phone number,
 * matching the original PHP behavior. Returns an empty string if the input
 * is empty after trimming.
 */
export const stripCountryCode = (raw: string | null | undefined): string => {
  let v = (raw ?? '').trim();
  if (v.startsWith('+91')) v = v.slice(3);
  else if (v.startsWith('91') && v.length > 10) v = v.slice(2);
  return v.trim();
};

/** Render a fallback "—" for missing values, matching the PHP deck. */
export const fallback = (v: string | null | undefined): string => {
  const t = (v ?? '').trim();
  return t === '' ? '—' : t;
};

/**
 * Fetch a single employee record by their employee_id.
 *
 * The serverless route lives at /api/employee/:id and returns the row as
 * JSON (or { error: "..." } with 4xx/5xx on failure). The React side
 * does the same sanitization the PHP used to do, keeping the rendered
 * output identical to the original deck.
 */
export async function fetchEmployee(id: string, signal?: AbortSignal): Promise<EmployeeUser> {
  const url = `${API_BASE}/${encodeURIComponent(id)}`;
  const res = await fetch(url, { signal, headers: { Accept: 'application/json' } });

  if (!res.ok) {
    if (res.status === 404) {
      throw new ProfileError(
        'not_found',
        `The profile footprint matching ID '${id}' does not exist.`,
      );
    }
    throw new ProfileError('network', `Profile Engine Error: HTTP ${res.status}`);
  }

  const data = (await res.json()) as Partial<EmployeeUser> & { error?: string };
  if (data && typeof data === 'object' && typeof data.error === 'string') {
    throw new ProfileError('not_found', data.error);
  }

  return {
    first_name: data.first_name ?? '',
    last_name: data.last_name ?? '',
    email: data.email ?? '',
    employee_id: data.employee_id ?? id,
    contact: data.contact ?? '',
    designation: data.designation ?? 'Software Engineer',
    blood_group: data.blood_group ?? '',
    emergency_contact: data.emergency_contact ?? '',
    address: data.address ?? '',
    linkedin: data.linkedin ?? '',
    team_id: data.team_id,
    photo_url: data.photo_url,
  };
}

export class ProfileError extends Error {
  constructor(public kind: 'not_found' | 'network' | 'config', message: string) {
    super(message);
    this.name = 'ProfileError';
  }
}
