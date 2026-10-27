export interface UserResponse {
  id: number;
  username: string;
  role: 'member' | 'librarian' | 'admin';
  isActive: boolean;
}