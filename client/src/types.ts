// types.ts
export interface User {
    uid: string;
    username: string;
    first_name?: string;
    last_name?: string;
    email: string;
}

export interface UserStore {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    setUser: (user: User, accessToken: string) => void;
    logout: () => void;
}
