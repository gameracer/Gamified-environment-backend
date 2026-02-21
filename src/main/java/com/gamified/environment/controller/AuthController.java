package com.gamified.environment.controller;

import com.gamified.environment.dto.AuthDtos;
import com.gamified.environment.entity.User;
import com.gamified.environment.repo.UserRepository;
import com.gamified.environment.security.JwtUtil;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    // Dependencies for user repository, password encoding, and JWT utility
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    // Constructor for dependency injection
    public AuthController(UserRepository userRepository, PasswordEncoder encoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Handles user registration by creating a new user account.
     * @param req The registration request containing username, password, and display name.
     * @return A ResponseEntity with a JWT token if registration is successful, or an error message if the username is taken.
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid AuthDtos.Register req) {
        // Check if the username is already taken
        if (userRepository.existsByUsername(req.getUsername())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username already taken"));
        }

        // Validate the password strength
        if (!isValidPassword(req.getPassword())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Password does not meet security requirements"));
        }

        // Create a new user
        User user = User.builder()
                .username(req.getUsername())
                .password(encoder.encode(req.getPassword()))
                .displayName(req.getDisplayName())
                .role(com.gamified.environment.entity.Role.USER)
                .build();

        userRepository.save(user);

        // Issue JWT token
        AuthDtos.TokenResponse token = new AuthDtos.TokenResponse();
        token.setToken(jwtUtil.generateToken(user.getUsername()));
        token.setRole(user.getRole().name());

        return ResponseEntity.ok(token);
    }

    /**
     * Handles user login by validating credentials and issuing a JWT token.
     * @param req The login request containing username and password.
     * @return A ResponseEntity with a JWT token if login is successful, or an error message if credentials are invalid.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthDtos.Login req) {
        // Find user by username
        Optional<User> userOptional = userRepository.findByUsername(req.getUsername());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }

        User user = userOptional.get();
        // Validate password
        if (!encoder.matches(req.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }

        // Issue JWT token
        AuthDtos.TokenResponse token = new AuthDtos.TokenResponse();
        token.setToken(jwtUtil.generateToken(user.getUsername()));
        token.setRole(user.getRole().name());
        token.setUser(user.getUsername());

        return ResponseEntity.ok(token);
    }

    /**
     * Validates the strength of a password.
     * @param password The password to validate.
     * @return True if the password meets the security requirements, false otherwise.
     */
    private boolean isValidPassword(String password) {
        // Password must be at least 8 characters long and contain a mix of letters and numbers
        return password.length() >= 8 && password.matches(".*[A-Za-z].*") && password.matches(".*[0-9].*");
    }
}
