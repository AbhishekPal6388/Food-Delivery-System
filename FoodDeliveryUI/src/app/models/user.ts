export interface User {
  id: number;
  username: string;
  role: 'Customer' | 'Admin';
  token?: string;
}
