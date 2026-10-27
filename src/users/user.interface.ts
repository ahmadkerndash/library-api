export interface User {
    id: number;
    username: string;
    password: string;
    role:'member'|'librarian'|'admin';
    isActive: boolean;
}