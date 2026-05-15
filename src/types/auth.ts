export interface AuthUser {
    id: string;
    email: string;
    name: string;
    created_at: string;
}

export interface AuthSession {
    access_token: string;
    expires_at: string;
    user: AuthUser | null
}