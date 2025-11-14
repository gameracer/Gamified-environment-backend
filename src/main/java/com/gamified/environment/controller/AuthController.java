package com.gamified.environment.controller;

import com.gamified.environment.dto.AuthDtos;
import com.gamified.environment.entity.User;
import com.gamified.environment.repo.UserRepository;
import com.gamified.environment.security.JwtUtil;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, PasswordEncoder encoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    // ============================
    // User Registration
    // ============================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthDtos.Register req) {

        if (userRepository.existsByUsername(req.getUsername())) {
            return ResponseEntity.badRequest().body("Username already taken");
        }

        User user = User.builder()
                .username(req.getUsername())
                .password(encoder.encode(req.getPassword()))
                .displayName(req.getDisplayName())
                .build();

        userRepository.save(user);

        // Issue JWT token
        AuthDtos.TokenResponse token = new AuthDtos.TokenResponse();
        token.setToken(jwtUtil.generateToken(user.getUsername()));

        return ResponseEntity.ok(token);
    }

    // ============================
    // User Login
    // ============================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthDtos.Login req) {

        return userRepository.findByUsername(req.getUsername())
                .map(user -> {
                    if (encoder.matches(req.getPassword(), user.getPassword())) {

                        AuthDtos.TokenResponse token = new AuthDtos.TokenResponse();
                        token.setToken(jwtUtil.generateToken(user.getUsername()));

                        return ResponseEntity.ok(token);
                    } else {
                        return ResponseEntity.status(401).body("Invalid credentials");
                    }
                })
                .orElse(ResponseEntity.status(404).body("User not found"));
    }
}
