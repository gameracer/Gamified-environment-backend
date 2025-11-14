package com.gamified.environment.dto;

import lombok.Data;

public class AuthDtos {

    @Data
    public static class Register {
        private String username;
        private String password;
        private String displayName;
    }

    @Data
    public static class Login {
        private String username;
        private String password;
    }

    @Data
    public static class TokenResponse {
        private String token;
    }
}
