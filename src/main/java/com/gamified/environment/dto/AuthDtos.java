package com.gamified.environment.dto;

import lombok.Data;

/**
 * A collection of Data Transfer Objects (DTOs) used for authentication-related operations.
 * This class contains nested static classes for different authentication requests and responses.
 */
public class AuthDtos {

    /**
     * DTO for user registration requests.
     * Contains the necessary fields for registering a new user.
     */
    @Data
    public static class Register {
        private String username;    // The username of the new user
        private String password;    // The password of the new user
        private String displayName; // The display name of the new user
    }

    /**
     * DTO for user login requests.
     * Contains the necessary fields for user authentication.
     */
    @Data
    public static class Login {
        private String username; // The username of the user
        private String password; // The password of the user
    }

    /**
     * DTO for token response after successful authentication.
     * Contains the JWT token, user role, and username.
     */
    @Data
    public static class TokenResponse {
        private String token; // The generated JWT token
        private String role;  // The role of the authenticated user
        private String user;  // The username of the authenticated user
    }
}
