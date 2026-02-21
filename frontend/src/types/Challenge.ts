export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export interface Challenge {
    id: number;
    title: string;
    description: string;
    difficulty: Difficulty;
    xpReward: number;
}
