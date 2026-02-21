package com.gamified.environment.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration-ms}")
    private long expirationMs;

    // Generate JWT token
    public String generateToken(String username) {
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());
        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key) // Sign the token with the secret key
                .compact();
    }

    // Extract username
    public String getUsername(String token) {
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes()); // Generate the secret key
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject(); // Extract the subject (username)
    }

    // Validate the token
    public boolean validateToken(String token) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(secret.getBytes()); // Generate the secret key
            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token); // Parse and validate the token
            return true; // Token is valid
        } catch (ExpiredJwtException e) {
            System.err.println("JWT token has expired: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.err.println("JWT token is unsupported: " + e.getMessage());
        } catch (MalformedJwtException e) {
            System.err.println("JWT token is malformed: " + e.getMessage());
        } catch (JwtException e) {
            System.err.println("JWT token signature is invalid: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.err.println("JWT token is invalid: " + e.getMessage());
        }
        return false; // Token is invalid
    }
}
