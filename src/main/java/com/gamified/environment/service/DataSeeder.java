package com.gamified.environment.service;

import com.gamified.environment.entity.Badge;
import com.gamified.environment.entity.EnvironmentalChallenge;
import com.gamified.environment.entity.Lesson;
import com.gamified.environment.entity.Module;
import com.gamified.environment.entity.Role;
import com.gamified.environment.entity.User;
import com.gamified.environment.repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

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
    public void run(String... args) throws Exception {
        // Only seed if database is empty
        if (userRepository.count() > 0) {
            System.out.println("Database already seeded, skipping...");
            return;
        }

        System.out.println("Seeding database with sample data...");

        // Create Admin User
        User admin = User.builder()
                .username("admin")
                .password(passwordEncoder.encode("admin123"))
                .displayName("Admin User")
                .role(Role.ADMIN)
                .xp(10000)
                .level(10)
                .gems(500)
                .avatar("avatar1")
                .build();
        userRepository.save(admin);

        // Create Sample Users
        for (int i = 1; i <= 10; i++) {
            User user = User.builder()
                    .username("user" + i)
                    .password(passwordEncoder.encode("password"))
                    .displayName("Player " + i)
                    .role(Role.USER)
                    .xp(i * 100L)
                    .level(i)
                    .streak(i % 7)
                    .gems(i * 10)
                    .avatar("avatar" + ((i % 6) + 1))
                    .build();
            userRepository.save(user);
        }

        // Create Modules
        Module module1 = new Module();
        module1.setTitle("The Green Beginning");
        module1.setDescription("Learn the basics of environmental conservation");
        module1.setOrderIndex(1);
        moduleRepository.save(module1);

        Module module2 = new Module();
        module2.setTitle("Forests & Wildlife");
        module2.setDescription("Discover the importance of forests and biodiversity");
        module2.setOrderIndex(2);
        moduleRepository.save(module2);

        Module module3 = new Module();
        module3.setTitle("Oceans & Water");
        module3.setDescription("Explore marine ecosystems and water conservation");
        module3.setOrderIndex(3);
        moduleRepository.save(module3);

        // Create Lessons
        createLesson(module1, "What is Sustainability?", "Learn the fundamentals of sustainable living", 1);
        createLesson(module1, "Reduce, Reuse, Recycle", "Master the 3 R's of waste management", 2);
        createLesson(module1, "Energy Conservation", "Discover ways to save energy at home", 3);
        createLesson(module1, "Water Conservation", "Learn to conserve our most precious resource", 4);

        createLesson(module2, "Forest Ecosystems", "Understand how forests support life", 1);
        createLesson(module2, "Deforestation Impact", "Learn about the effects of losing forests", 2);
        createLesson(module2, "Wildlife Protection", "Discover endangered species and conservation", 3);
        createLesson(module2, "Planting Trees", "Get hands-on with reforestation", 4);

        createLesson(module3, "Ocean Life", "Explore the diversity of marine ecosystems", 1);
        createLesson(module3, "Plastic Pollution", "Understand the plastic crisis in our oceans", 2);
        createLesson(module3, "Clean Water Access", "Learn about global water challenges", 3);
        createLesson(module3, "Marine Conservation", "Discover ways to protect our oceans", 4);

        // Create Challenges
        createChallenge("Plastic-Free Week", "Avoid single-use plastics for 7 days", "MEDIUM", 100);
        createChallenge("Plant a Tree", "Plant and care for a tree in your community", "EASY", 50);
        createChallenge("Energy Saver", "Reduce electricity usage by 20% this month", "HARD", 200);
        createChallenge("Water Warrior", "Save 50 liters of water daily for a week", "MEDIUM", 100);
        createChallenge("Recycle Champion", "Properly recycle 100 items", "EASY", 50);
        createChallenge("Bike to School", "Use bicycle instead of car for a week", "MEDIUM", 100);
        createChallenge("Compost Master", "Start a compost bin and maintain it for a month", "HARD", 200);
        createChallenge("Beach Cleanup", "Collect 10kg of trash from a beach or park", "MEDIUM", 150);
        createChallenge("Eco Shopping", "Buy only eco-friendly products for 2 weeks", "MEDIUM", 100);
        createChallenge("Zero Waste Day", "Produce zero waste for an entire day", "HARD", 250);

        // Create Badges
        createBadge("First Steps", "Complete your first lesson", "BRONZE");
        createBadge("Quick Learner", "Complete 5 lessons", "SILVER");
        createBadge("Knowledge Master", "Complete all lessons in a module", "GOLD");
        createBadge("Challenge Accepted", "Complete your first challenge", "BRONZE");
        createBadge("Eco Warrior", "Complete 10 challenges", "SILVER");
        createBadge("Planet Protector", "Complete 25 challenges", "GOLD");
        createBadge("Streak Starter", "Maintain a 7-day streak", "BRONZE");
        createBadge("Consistency King", "Maintain a 30-day streak", "SILVER");
        createBadge("Dedication Diamond", "Maintain a 100-day streak", "DIAMOND");
        createBadge("Level 10", "Reach level 10", "GOLD");

        System.out.println("Database seeding completed!");
    }

    private void createLesson(Module module, String title, String description, int order) {
        Lesson lesson = new Lesson();
        lesson.setTitle(title);
        lesson.setDescription(description);
        lesson.setContent("This is the content for: " + title + ". " + description);
        lesson.setModule(module);
        lesson.setOrderIndex(order);
        lesson.setXpReward(25);
        lessonRepository.save(lesson);
    }

    private void createChallenge(String title, String description, String difficulty, int xp) {
        EnvironmentalChallenge challenge = new EnvironmentalChallenge();
        challenge.setTitle(title);
        challenge.setDescription(description);
        challenge.setDifficulty(difficulty);
        challenge.setXpReward(xp);
        challengeRepository.save(challenge);
    }

    private void createBadge(String name, String description, String tier) {
        Badge badge = new Badge();
        badge.setName(name);
        badge.setDescription(description);
        badge.setTier(tier);
        badgeRepository.save(badge);
    }
}
