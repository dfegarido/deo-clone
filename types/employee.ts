export interface EmployeeUser {
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
  /** Optional: an absolute or relative URL to the user's profile image. */
  photo_url?: string;
}
