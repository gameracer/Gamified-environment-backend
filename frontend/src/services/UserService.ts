import type {UserProfile} from "../types/UserProfile.ts";

const API_URL = "http://localhost:8080";

export async function getCurrentUser(): Promise<UserProfile> {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/user/me`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user");
    }

    return response.json();
}