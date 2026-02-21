import type { AuthDtos } from "../types/auth";

const API_URL = "/api";

export const api = {
    async register(data: AuthDtos.Register) {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const error = await response.text();
                console.error("Registration Error:", error);
                throw new Error(error || "Registration failed");
            }
            return response.json();
        } catch (error) {
            console.error("Network/Server Error:", error);
            throw error;
        }
    },

    async login(data: AuthDtos.Login) {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const error = await response.text();
                console.error("Login Error:", error);
                throw new Error(error || "Login failed");
            }
            return response.json();
        } catch (error) {
            console.error("Network/Server Error:", error);
            throw error;
        }
    },

    async get(endpoint: string, token: string) {
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error("Request failed");
            return response.json();
        } catch (error) {
            console.error("GET Error:", error);
            throw error;
        }
    },

    async post(endpoint: string, data: any, token: string) {
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error("Request failed");
            return response.json();
        } catch (error) {
            console.error("POST Error:", error);
            throw error;
        }
    },
    async put(endpoint: string, data: any, token: string) {
        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || "PUT request failed");
            }

            return response.json();
        } catch (error) {
            console.error("PUT Error:", error);
            throw error;
        }
    },

};
