import { api } from "./api";
import type { Lesson } from "../types/Lesson";

// Fetch lessons by module
export async function fetchLessons(moduleId: number, token: string) {
    return api.get(`/lessons/module/${moduleId}`, token) as Promise<Lesson[]>;
}

// Complete lesson
export async function completeLesson(lessonId: number, token: string) {
    return api.post(`/lessons/${lessonId}/complete`, {}, token);
}
