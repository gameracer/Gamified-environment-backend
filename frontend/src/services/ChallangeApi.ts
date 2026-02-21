import type { Challenge } from "../types/Challenge";

const API_URL = "/api/challenges"; // change to your backend

export async function fetchChallenges(): Promise<Challenge[]> {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    const res = await fetch(API_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // include token in header
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch challenges");
    }

    return res.json();
}
