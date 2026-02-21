package com.gamified.environment.controller;

import com.gamified.environment.entity.*;
import com.gamified.environment.repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

// This controller handles administrative operations for the application
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    // Repositories for accessing database entities
    private final UserRepository userRepository;
    private final EnvironmentalChallengeRepository challengeRepository;
    private final LessonRepository lessonRepository;
    private final BadgeRepository badgeRepository;

    /**
     * Retrieves statistics for the admin dashboard.
     * @return A ResponseEntity containing a map of total counts for users, challenges, lessons, and badges.
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalChallenges", challengeRepository.count());
        stats.put("totalLessons", lessonRepository.count());
        stats.put("totalBadges", badgeRepository.count());
        return ResponseEntity.ok(stats);
    }

    /**
     * Retrieves a list of all users in the system.
     * @return A ResponseEntity containing a list of all users.
     */
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    /**
     * Updates the role of a specific user.
     * @param id The ID of the user whose role is to be updated.
     * @param body A map containing the new role for the user.
     * @return A ResponseEntity containing the updated user.
     */
    @PutMapping("/users/{id}/role")
    public ResponseEntity<User> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> body) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(Role.valueOf(body.get("role")));
        return ResponseEntity.ok(userRepository.save(user));
    }

    /**
     * Deletes a user by their ID.
     * @param id The ID of the user to delete.
     * @return A ResponseEntity with no content.
     */
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Note: Challenge Management has been moved to ChallengeController
    // Note: Lesson Management has been moved to LessonController
}
