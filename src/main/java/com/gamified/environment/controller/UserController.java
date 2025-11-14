package com.gamified.environment.controller;

import com.gamified.environment.entity.User;
import com.gamified.environment.repo.UserRepository;
import com.gamified.environment.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public UserController(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    // ===============================
    // GET /user/me
    // ===============================
    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(@RequestHeader("Authorization") String authHeader) {

        String username = extractUsername(authHeader);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(user);
    }

    // ===============================
    // Helper: Extract JWT -> username
    // ===============================
    private String extractUsername(String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }

        String jwt = authHeader.substring(7);
        return jwtUtil.getUsername(jwt);
    }
}
