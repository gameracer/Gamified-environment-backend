export interface UserProfile {
    id: number;
    username: string;
    displayName: string;
    xp: number;
    level: number;
    streak: number;
    gems: number;
    role: string;
    avatar: string;
    createdAt: string;
    lastLoginAt: string | null;
    badges: any[];
}