export interface User {
  role: string;
  id: number;
  username: string;
  email: string;
  password?: string;
  roles: string[]; // Changed from 'role' to 'roles' array
}
