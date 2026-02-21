package com.gamified.environment.service;

import com.gamified.environment.entity.*;
import com.gamified.environment.repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final EnvironmentalChallengeRepository challengeRepository;
    private final LessonRepository lessonRepository;
    private final ModuleRepository moduleRepository;
    private final BadgeRepository badgeRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        System.out.println("Checking database seed state...");

        seedUsers();

        if (moduleRepository.count() > 0) {
            System.out.println("Modules already exist. Skipping lesson/module seed.");
            return;
        }

        seedModulesAndLessons();
        seedChallenges();
        seedBadges();

        System.out.println("Database seeding completed successfully.");
    }

    // ==================================================
    // USERS
    // ==================================================
    private void seedUsers() {

        if (!userRepository.existsByUsername("admin")) {
            userRepository.save(User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("admin123"))
                    .displayName("Admin User")
                    .role(Role.ADMIN)
                    .xp(10000L)
                    .level(10)
                    .gems(500)
                    .streak(0)
                    .avatar("avatar1")
                    .build());
        }

        if (!userRepository.existsByUsername("educator")) {
            userRepository.save(User.builder()
                    .username("educator")
                    .password(passwordEncoder.encode("educator123"))
                    .displayName("Mrs. Frizzle")
                    .role(Role.EDUCATOR)
                    .xp(5000L)
                    .level(8)
                    .gems(300)
                    .streak(0)
                    .avatar("avatar2")
                    .build());
        }

        if (!userRepository.existsByUsername("partner")) {
            userRepository.save(User.builder()
                    .username("partner")
                    .password(passwordEncoder.encode("partner123"))
                    .displayName("Green Earth NGO")
                    .role(Role.COMMUNITY_PARTNER)
                    .xp(2000L)
                    .level(5)
                    .gems(100)
                    .streak(0)
                    .avatar("avatar3")
                    .build());
        }

        if (userRepository.count() < 6) {
            for (int i = 1; i <= 5; i++) {
                userRepository.save(User.builder()
                        .username("user" + i)
                        .password(passwordEncoder.encode("password"))
                        .displayName("Player " + i)
                        .role(Role.USER)
                        .xp((long) i * 100)
                        .level(i)
                        .streak(i % 7)
                        .gems(i * 10)
                        .avatar("avatar" + ((i % 6) + 1))
                        .build());
            }
        }
    }

    // ==================================================
    // MODULES & LESSONS
    // ==================================================
    private void seedModulesAndLessons() {

        LearningModule module1 = moduleRepository.save(
                LearningModule.builder()
                        .title("The Green Beginning")
                        .description("Learn the basics of environmental conservation")
                        .difficulty("EASY")
                        .orderIndex(1)
                        .build());

        LearningModule module2 = moduleRepository.save(
                LearningModule.builder()
                        .title("Forests & Wildlife")
                        .description("Discover the importance of forests and biodiversity")
                        .difficulty("MEDIUM")
                        .orderIndex(2)
                        .build());

        LearningModule module3 = moduleRepository.save(
                LearningModule.builder()
                        .title("Oceans & Water")
                        .description("Explore marine ecosystems and water conservation")
                        .difficulty("HARD")
                        .orderIndex(3)
                        .build());

        // Module 1 Lessons
        createLesson(module1, 1, "What is Sustainability?",
                "Learn the fundamentals of sustainable living");

        createLesson(module1, 2, "Reduce, Reuse, Recycle",
                "Master the 3 R's of waste management");

        createLesson(module1, 3, "Energy Conservation",
                "Discover ways to save energy at home");

        createLesson(module1, 4, "Water Conservation",
                "Learn to conserve our most precious resource");

        // Module 2 Lessons
        createLesson(module2, 1, "Forest Ecosystems",
                "Understand how forests support life");

        createLesson(module2, 2, "Deforestation Impact",
                "Learn about the effects of losing forests");

        createLesson(module2, 3, "Wildlife Protection",
                "Discover endangered species and conservation");

        createLesson(module2, 4, "Planting Trees",
                "Get hands-on with reforestation");

        // Module 3 Lessons
        createLesson(module3, 1, "Ocean Life",
                "Explore the diversity of marine ecosystems");

        createLesson(module3, 2, "Plastic Pollution",
                "Understand the plastic crisis in our oceans");

        createLesson(module3, 3, "Clean Water Access",
                "Learn about global water challenges");

        createLesson(module3, 4, "Marine Conservation",
                "Discover ways to protect our oceans");
    }

    private void createLesson(LearningModule module, int order,
                              String title, String description) {

        lessonRepository.save(
                Lesson.builder()
                        .title(title)
                        .description(description)
                        .content("<h2>" + title + "</h2><p>" + description + "</p>")
                        .module(module)
                        .orderIndex(order)
                        .xpReward(25)
                        .fileName(null)
                        .fileUrl(null)
                        .build()
        );
    }

    // ==================================================
    // CHALLENGES
    // ==================================================
    private void seedChallenges() {

        createChallenge("Plastic-Free Week",
                "Avoid single-use plastics for 7 days", "MEDIUM", 100);

        createChallenge("Plant a Tree",
                "Plant and care for a tree in your community", "EASY", 50);

        createChallenge("Energy Saver",
                "Reduce electricity usage by 20% this month", "HARD", 200);
    }

    private void createChallenge(String title, String description,
                                 String difficulty, int xp) {

        challengeRepository.save(
                EnvironmentalChallenge.builder()
                        .title(title)
                        .description(description)
                        .difficulty(difficulty)
                        .xpReward(xp)
                        .challengeType("SYSTEM")
                        .build()
        );
    }

    // ==================================================
    // BADGES
    // ==================================================
    private void seedBadges() {

        createBadge("First Steps",
                "Complete your first lesson", "BRONZE");

        createBadge("Quick Learner",
                "Complete 5 lessons", "SILVER");

        createBadge("Knowledge Master",
                "Complete all lessons in a module", "GOLD");
    }

    private void createBadge(String name,
                             String description,
                             String tier) {

        badgeRepository.save(
                Badge.builder()
                        .name(name)
                        .description(description)
                        .tier(tier)
                        .build()
        );
    }
}
