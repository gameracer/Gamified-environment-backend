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

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

/**
 * Controller for managing environmental challenges and user submissions.
 * Provides endpoints for CRUD operations on challenges and submission handling.
 */
@RestController
@RequestMapping("/challenges")
public class ChallengeController {

    private final EnvironmentalChallengeRepository challengeRepo;
    private final UserChallengeSubmissionRepository submissionRepo;
    private final GamificationService gamificationService;
    private final JwtUtil jwtUtil;

    private static final String UPLOAD_DIR = "uploads/";

    /**
     * Constructor for dependency injection and initialization.
     * Ensures the upload directory exists.
     */
    public ChallengeController(EnvironmentalChallengeRepository challengeRepo,
                                UserChallengeSubmissionRepository submissionRepo,
                                GamificationService gamificationService,
                                JwtUtil jwtUtil) {
        this.challengeRepo = challengeRepo;
        this.submissionRepo = submissionRepo;
        this.gamificationService = gamificationService;
        this.jwtUtil = jwtUtil;

        // Ensure the upload directory exists
        File dir = new File(UPLOAD_DIR);
        if (!dir.exists()) {
            dir.mkdirs();
        }
    }

    /**
     * Get all challenges.
     * @return A list of all challenges.
     */
    @GetMapping
    public ResponseEntity<?> getAllChallenges() {
        return ResponseEntity.ok(challengeRepo.findAll());
    }

    /**
     * Get a single challenge by its ID.
     * @param id The ID of the challenge.
     * @return The challenge if found, or an error message if not found.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getChallengeById(@PathVariable Long id) {
        return challengeRepo.findById(id)
                .map(challenge -> ResponseEntity.ok((Object) challenge))
                .orElseGet(() -> ResponseEntity.badRequest().body("Challenge not found"));
    }

    /**
     * Create a new challenge.
     * Only accessible to users with roles ADMIN or COMMUNITY_PARTNER.
     * @param challenge The challenge details to create.
     * @return The created challenge.
     */
    @PostMapping
    @org.springframework.security.access.prepost.PreAuthorize("hasAnyRole('ADMIN', 'COMMUNITY_PARTNER')")
    public ResponseEntity<?> createChallenge(@RequestBody EnvironmentalChallenge challenge) {
        return ResponseEntity.ok(challengeRepo.save(challenge));
    }

    /**
     * Update an existing challenge.
     * Only accessible to users with roles ADMIN or COMMUNITY_PARTNER.
     * @param id The ID of the challenge to update.
     * @param challenge The updated challenge details.
     * @return The updated challenge, or a 404 error if the challenge is not found.
     */
    @PutMapping("/{id}")
    @org.springframework.security.access.prepost.PreAuthorize("hasAnyRole('ADMIN', 'COMMUNITY_PARTNER')")
    public ResponseEntity<?> updateChallenge(@PathVariable Long id, @RequestBody EnvironmentalChallenge challenge) {
        return challengeRepo.findById(id)
                .map(existing -> {
                    challenge.setId(id); // Ensure the ID remains the same
                    return ResponseEntity.ok(challengeRepo.save(challenge));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Delete a challenge by its ID.
     * Only accessible to users with the ADMIN role.
     * @param id The ID of the challenge to delete.
     * @return A success message if deleted, or a 404 error if the challenge is not found.
     */
    @DeleteMapping("/{id}")
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteChallenge(@PathVariable Long id) {
        if (!challengeRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        challengeRepo.deleteById(id);
        return ResponseEntity.ok("Challenge deleted");
    }

    /**
     * Submit a challenge by uploading a file.
     * Only accessible to users with the USER role.
     * @param challengeId The ID of the challenge being submitted.
     * @param file The file submitted as proof of challenge completion.
     * @param authHeader The Authorization header containing the JWT token.
     * @return A success message if the submission is successful, or an error message otherwise.
     */
    @PostMapping("/{challengeId}/submit")
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> submitChallenge(
            @PathVariable Long challengeId,
            @RequestParam("file") MultipartFile file,
            @RequestHeader("Authorization") String authHeader) {

        // Extract the username from the Authorization header
        String username = extractUsername(authHeader);

        // Find the challenge by ID
        EnvironmentalChallenge challenge = challengeRepo.findById(challengeId)
                .orElseThrow(() -> new RuntimeException("Challenge not found"));

        // Check if the user has already submitted this challenge
        if (submissionRepo.findByUsernameAndChallengeId(username, challengeId).isPresent()) {
            return ResponseEntity.badRequest().body("You already completed this challenge.");
        }

        // Check if the file is empty
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("No file uploaded");
        }

        try {
            // Clean the file name and prepare the upload path
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            Path uploadPath = Paths.get(UPLOAD_DIR);

            // Ensure the upload directory exists
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Save the uploaded file with a unique name
            Path filePath = uploadPath.resolve(System.currentTimeMillis() + "_" + fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Create a new submission record
            UserChallengeSubmission submission = UserChallengeSubmission.builder()
                    .username(username)
                    .challengeId(challengeId)
                    .imagePath(filePath.toString())
                    .timestamp(System.currentTimeMillis())
                    .build();

            // Save the submission and award XP to the user
            submissionRepo.save(submission);
            gamificationService.awardXp(username, challenge.getXpReward());

            return ResponseEntity.ok("Challenge submitted successfully! XP awarded.");

        } catch (IOException e) {
            // Handle file upload errors
            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
        }
    }

    /**
     * Extracts the username from the Authorization header.
     * @param authHeader The Authorization header containing the JWT token.
     * @return The username extracted from the token.
     * @throws RuntimeException if the Authorization header is invalid.
     */
    private String extractUsername(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid Authorization header");
        }

        String token = authHeader.substring(7); // Remove "Bearer " prefix
        return jwtUtil.getUsername(token); // Extract username from the token
    }
}
