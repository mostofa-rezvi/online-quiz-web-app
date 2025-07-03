export interface User {
  id: number;
  username: string;
  email: string;
  password?: string; // Should not be sent to frontend in real app
  role: 'user' | 'admin';
}
