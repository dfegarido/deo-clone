import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getEmployee } from '../_lib/employeeRepo';

const VALID_ID = /^[A-Za-z0-9_-]{1,64}$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS — open by default. Tighten to evolutra.com domain before launch.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const id = String(req.query.id ?? '').trim();
  if (!id || !VALID_ID.test(id)) {
    return res.status(400).json({
      error: 'No valid Employee Identifier specified in request parameters.',
    });
  }

  try {
    const user = await getEmployee(id);
    if (!user) {
      return res.status(404).json({
        error: `The profile footprint matching ID '${id}' does not exist.`,
      });
    }
    return res.status(200).json(user);
  } catch (err) {
    // Don't leak DB error details in production.
    const message =
      process.env.NODE_ENV === 'production'
        ? 'Profile Engine Error: Connection down.'
        : `Profile Engine Error: ${(err as Error).message}`;
    return res.status(500).json({ error: message });
  }
}
