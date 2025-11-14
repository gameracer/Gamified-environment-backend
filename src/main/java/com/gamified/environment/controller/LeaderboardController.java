package com.gamified.environment.controller;

import com.gamified.environment.repo.UserRepository;
import com.gamified.environment.security.JwtUtil;

import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.data.redis.core.StringRedisTemplate;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/leaderboard")
public class LeaderboardController {

    private final StringRedisTemplate redis;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    private static final String LEADERBOARD_KEY = "xp_leaderboard";

    public LeaderboardController(StringRedisTemplate redis,
                                 UserRepository userRepository,
                                 JwtUtil jwtUtil) {
        this.redis = redis;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    // ========================================================
    // UPDATE LEADERBOARD
    // ========================================================
    @PostMapping("/update")
    public ResponseEntity<?> updateLeaderboard(
            @RequestHeader("Authorization") String authHeader) {

        String username = extractUsername(authHeader);

        long xp = userRepository.findByUsername(username)
                .map(u -> u.getXp())
                .orElse(0L);

        // ONLY STRINGS allowed
        redis.opsForZSet().add(LEADERBOARD_KEY, username, (double) xp);

        return ResponseEntity.ok("Leaderboard updated");
    }

    // ========================================================
    // GET TOP 10 USERS
    // ========================================================
    @GetMapping("/top")
    public ResponseEntity<?> getTopPlayers() {

        Set<ZSetOperations.TypedTuple<String>> top =
                redis.opsForZSet().reverseRangeWithScores(LEADERBOARD_KEY, 0, 9);

        List<Map<String, Object>> response = new ArrayList<>();

        if (top != null) {
            for (ZSetOperations.TypedTuple<String> tuple : top) {
                Map<String, Object> entry = new HashMap<>();
                entry.put("username", tuple.getValue());
                entry.put("xp", tuple.getScore().longValue());
                response.add(entry);
            }
        }

        return ResponseEntity.ok(response);
    }

    // ========================================================
    // GET USER’S RANK
    // ========================================================
    @GetMapping("/rank")
    public ResponseEntity<?> getMyRank(
            @RequestHeader("Authorization") String authHeader) {

        String username = extractUsername(authHeader);

        Long rank = redis.opsForZSet().reverseRank(LEADERBOARD_KEY, username);

        if (rank == null) {
            return ResponseEntity.ok(Map.of(
                    "message", "User not found in leaderboard"
            ));
        }

        return ResponseEntity.ok(Map.of(
                "username", username,
                "rank", rank + 1
        ));
    }

    // ========================================================
    // HELPER — Extract username from JWT
    // ========================================================
    private String extractUsername(String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer "))
            throw new RuntimeException("Invalid Authorization header");

        return jwtUtil.getUsername(authHeader.substring(7));
    }
}
