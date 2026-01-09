package com.gamified.environment.controller;

import com.gamified.environment.entity.*;
import com.gamified.environment.repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final EnvironmentalChallengeRepository challengeRepository;
    private final LessonRepository lessonRepository;
    private final BadgeRepository badgeRepository;

    // Dashboard Statistics
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalChallenges", challengeRepository.count());
        stats.put("totalLessons", lessonRepository.count());
        stats.put("totalBadges", badgeRepository.count());
        return ResponseEntity.ok(stats);
    }

    // User Management
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<User> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> body) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(Role.valueOf(body.get("role")));
        return ResponseEntity.ok(userRepository.save(user));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Challenge Management
    @GetMapping("/challenges")
    public ResponseEntity<List<EnvironmentalChallenge>> getAllChallenges() {
        return ResponseEntity.ok(challengeRepository.findAll());
    }

    @PostMapping("/challenges")
    public ResponseEntity<EnvironmentalChallenge> createChallenge(@RequestBody EnvironmentalChallenge challenge) {
        return ResponseEntity.ok(challengeRepository.save(challenge));
    }

    @PutMapping("/challenges/{id}")
    public ResponseEntity<EnvironmentalChallenge> updateChallenge(@PathVariable Long id,
            @RequestBody EnvironmentalChallenge challenge) {
        challenge.setId(id);
        return ResponseEntity.ok(challengeRepository.save(challenge));
    }

    @DeleteMapping("/challenges/{id}")
    public ResponseEntity<Void> deleteChallenge(@PathVariable Long id) {
        challengeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Lesson Management
    @GetMapping("/lessons")
    public ResponseEntity<List<Lesson>> getAllLessons() {
        return ResponseEntity.ok(lessonRepository.findAll());
    }

    @PostMapping("/lessons")
    public ResponseEntity<Lesson> createLesson(@RequestBody Lesson lesson) {
        return ResponseEntity.ok(lessonRepository.save(lesson));
    }

    @PutMapping("/lessons/{id}")
    public ResponseEntity<Lesson> updateLesson(@PathVariable Long id, @RequestBody Lesson lesson) {
        lesson.setId(id);
        return ResponseEntity.ok(lessonRepository.save(lesson));
    }

    @DeleteMapping("/lessons/{id}")
    public ResponseEntity<Void> deleteLesson(@PathVariable Long id) {
        lessonRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
