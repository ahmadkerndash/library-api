export interface User {
    id: number;
    username: string;
    
    role:'member'|'librarian'|'admin';
    isActive: boolean;
}