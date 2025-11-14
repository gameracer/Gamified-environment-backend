package com.gamified.environment.controller;

import com.gamified.environment.security.JwtUtil;
import com.gamified.environment.service.GamificationService;

import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.*;

@RestController
@RequestMapping("/upload")
public class FileUploadController {

    private final JwtUtil jwtUtil;
    private final GamificationService gamificationService;

    private static final String UPLOAD_DIR = "uploads/";

    public FileUploadController(JwtUtil jwtUtil, GamificationService gamificationService) {
        this.jwtUtil = jwtUtil;
        this.gamificationService = gamificationService;

        // Ensure upload directory exists
        File dir = new File(UPLOAD_DIR);
        if (!dir.exists()) dir.mkdirs();
    }

    // =====================================================
    // UPLOAD IMAGE FOR CHALLENGE
    // =====================================================
    @PostMapping("/challenge/{challengeId}")
    public ResponseEntity<?> uploadChallengeImage(
            @PathVariable Long challengeId,
            @RequestParam("file") MultipartFile file,
            @RequestHeader("Authorization") String authHeader
    ) {
        String username = extractUsername(authHeader);

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("No file uploaded");
        }

        try {
            // Clean file name
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());

            // Save file locally
            Path uploadPath = Paths.get(UPLOAD_DIR);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(System.currentTimeMillis() + "_" + fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Award XP for challenge submission
            gamificationService.awardXp(username, 150); // Example XP

            return ResponseEntity.ok("Image uploaded successfully. XP awarded!");

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error saving file: " + e.getMessage());
        }
    }

    // Extract username from JWT
    private String extractUsername(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer "))
            throw new RuntimeException("Invalid Authorization header");

        String token = authHeader.substring(7);
        return jwtUtil.getUsername(token);
    }
}
