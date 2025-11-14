package com.gamified.environment.service;

import com.gamified.environment.entity.Badge;
import com.gamified.environment.entity.User;
import com.gamified.environment.repo.BadgeRepository;
import com.gamified.environment.repo.UserRepository;

import jakarta.transaction.Transactional;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class GamificationService {

    private final UserRepository userRepository;
    private final BadgeRepository badgeRepository;
    private final StringRedisTemplate redis;

    private static final String LEADERBOARD_KEY = "xp_leaderboard";

    public GamificationService(UserRepository userRepository,
                               BadgeRepository badgeRepository,
                               StringRedisTemplate redis) {

        this.userRepository = userRepository;
        this.badgeRepository = badgeRepository;
        this.redis = redis;
    }

    // Award XP and update leaderboard
    @Transactional
    public void awardXp(String username, long xpEarned) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        long newXp = user.getXp() + xpEarned;
        user.setXp(newXp);

        // Level calculation
        int newLevel = computeLevel(newXp);
        user.setLevel(newLevel);

        // Award badges
        if (newXp >= 1000) {
            giveBadge(user, "ECO_WARRIOR", "Eco Warrior", "Awarded for reaching 1000 XP");
        }

        userRepository.save(user);

        // ===============================
        // Update leaderboard in Redis
        // ===============================
        redis.opsForZSet().add(LEADERBOARD_KEY, username, newXp);
    }

    // Badge logic
    private void giveBadge(User user, String code, String title, String description) {

        Badge badge = badgeRepository.findByCode(code)
                .orElseGet(() -> badgeRepository.save(
                        Badge.builder()
                                .code(code)
                                .title(title)
                                .description(description)
                                .build()
                ));

        if (!user.getBadges().contains(badge)) {
            user.getBadges().add(badge);
        }
    }

    // Level formula
    private int computeLevel(long xp) {
        return (int) Math.floor(Math.sqrt(xp / 100.0)) + 1;
    }
}
