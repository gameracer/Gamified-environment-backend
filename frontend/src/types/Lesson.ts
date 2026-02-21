// Represents lesson object returned from backend

export interface Lesson {
    id: number;
    title: string;
    description: string;
    xpReward: number;
    completed: boolean;
    locked: boolean;
    fileUrl?: string;
    content?: string;
}
