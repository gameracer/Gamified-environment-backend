package com.gamified.environment.controller;

import com.gamified.environment.entity.EnvironmentalChallenge;
import com.gamified.environment.entity.UserChallengeSubmission;
import com.gamified.environment.repo.EnvironmentalChallengeRepository;
import com.gamified.environment.repo.UserChallengeSubmissionRepository;
import com.gamified.environment.security.JwtUtil;
import com.gamified.environment.service.GamificationService;

import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.*;

@RestController
@RequestMapping("/challenges")
public class ChallengeController {

    private final EnvironmentalChallengeRepository challengeRepo;
    private final UserChallengeSubmissionRepository submissionRepo;
    private final GamificationService gamificationService;
    private final JwtUtil jwtUtil;

    private static final String UPLOAD_DIR = "uploads/";

    public ChallengeController(EnvironmentalChallengeRepository challengeRepo,
                               UserChallengeSubmissionRepository submissionRepo,
                               GamificationService gamificationService,
                               JwtUtil jwtUtil) {

        this.challengeRepo = challengeRepo;
        this.submissionRepo = submissionRepo;
        this.gamificationService = gamificationService;
        this.jwtUtil = jwtUtil;

        File dir = new File(UPLOAD_DIR);
        if (!dir.exists()) dir.mkdirs();
    }

    // ============================================
    // GET ALL CHALLENGES
    // ============================================
    @GetMapping
    public ResponseEntity<?> getAllChallenges() {
        return ResponseEntity.ok(challengeRepo.findAll());
    }

    // ============================================
    // GET SINGLE CHALLENGE (FIXED)
    // ============================================
    @GetMapping("/{id}")
    public ResponseEntity<?> getChallengeById(@PathVariable Long id) {

        return challengeRepo.findById(id)
                .map(challenge -> ResponseEntity.ok((Object) challenge))
                .orElseGet(() -> ResponseEntity.badRequest()
                        .body("Challenge not found"));
    }

    // ============================================
    // SUBMIT CHALLENGE
    // ============================================
    @PostMapping("/{challengeId}/submit")
    public ResponseEntity<?> submitChallenge(
            @PathVariable Long challengeId,
            @RequestParam("file") MultipartFile file,
            @RequestHeader("Authorization") String authHeader
    ) {
        String username = extractUsername(authHeader);

        EnvironmentalChallenge challenge = challengeRepo.findById(challengeId)
                .orElseThrow(() -> new RuntimeException("Challenge not found"));

        if (submissionRepo.findByUsernameAndChallengeId(username, challengeId).isPresent()) {
            return ResponseEntity.badRequest().body("You already completed this challenge.");
        }

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("No file uploaded");
        }

        try {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            Path uploadPath = Paths.get(UPLOAD_DIR);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(System.currentTimeMillis() + "_" + fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            UserChallengeSubmission submission = UserChallengeSubmission.builder()
                    .username(username)
                    .challengeId(challengeId)
                    .imagePath(filePath.toString())
                    .timestamp(System.currentTimeMillis())
                    .build();

            submissionRepo.save(submission);

            gamificationService.awardXp(username, challenge.getXpReward());

            return ResponseEntity.ok("Challenge submitted successfully! XP awarded.");

        } catch (IOException e) {
            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
        }
    }

    private String extractUsername(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid Authorization header");
        }

        String token = authHeader.substring(7);
        return jwtUtil.getUsername(token);
    }
}
