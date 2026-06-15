import type { RowDataPacket } from 'mysql2';
import { getPool } from './db';

export interface EmployeeRow {
  first_name: string;
  last_name: string;
  email: string;
  employee_id: string;
  contact: string;
  designation: string;
  blood_group: string;
  emergency_contact: string;
  address: string;
  linkedin: string;
  team_id?: string;
}

/**
 * Fetch a single employee by their `employee_id`.
 * Returns null when no row matches.
 */
export async function getEmployee(employeeId: string): Promise<EmployeeRow | null> {
  const sql =
    `SELECT first_name, last_name, email, employee_id, contact, designation,
            blood_group, emergency_contact, address, linkedin
       FROM ev_users
      WHERE employee_id = ?
      LIMIT 1`;
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[db] ${sql}  -- params: [${JSON.stringify(employeeId)}]`);
  }
  const [rows] = await getPool().execute<RowDataPacket[]>(sql, [employeeId]);
  if (rows.length === 0) return null;
  return rows[0] as EmployeeRow;
}
