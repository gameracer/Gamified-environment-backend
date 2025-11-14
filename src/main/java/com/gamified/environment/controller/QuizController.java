package com.gamified.environment.controller;

import com.gamified.environment.entity.*;
import com.gamified.environment.repo.*;
import com.gamified.environment.security.JwtUtil;
import com.gamified.environment.service.GamificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/quiz")
public class QuizController {

    private final LessonRepository lessonRepository;
    private final QuizRepository quizRepository;
    private final QuizQuestionRepository questionRepository;
    private final JwtUtil jwtUtil;
    private final GamificationService gamificationService;

    public QuizController(LessonRepository lessonRepository,
                          QuizRepository quizRepository,
                          QuizQuestionRepository questionRepository,
                          JwtUtil jwtUtil,
                          GamificationService gamificationService) {

        this.lessonRepository = lessonRepository;
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.jwtUtil = jwtUtil;
        this.gamificationService = gamificationService;
    }

    // =============================
    // GET QUIZ FOR LESSON
    // =============================
    @GetMapping("/lesson/{lessonId}")
    public ResponseEntity<?> getQuizByLesson(@PathVariable Long lessonId) {

        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        if (lesson.getQuiz() == null) {
            return ResponseEntity.badRequest().body("No quiz for this lesson");
        }

        return ResponseEntity.ok(lesson.getQuiz());
    }

    // =============================
    // SUBMIT QUIZ
    // =============================
    @PostMapping("/submit/{quizId}")
    public ResponseEntity<?> submitQuiz(
            @PathVariable Long quizId,
            @RequestBody Map<Long, String> userAnswers,
            @RequestHeader("Authorization") String authHeader
    ) {

        String username = extractUsername(authHeader);

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        int total = quiz.getQuestions().size();
        int correct = 0;

        for (QuizQuestion q : quiz.getQuestions()) {
            String userAnswer = userAnswers.get(q.getId());
            if (userAnswer != null && userAnswer.equalsIgnoreCase(q.getCorrectOption())) {
                correct++;
            }
        }

        // Example XP: +10 per correct answer
        int xpEarned = correct * 10;

        gamificationService.awardXp(username, xpEarned);

        return ResponseEntity.ok(Map.of(
                "totalQuestions", total,
                "correctAnswers", correct,
                "xpAwarded", xpEarned
        ));
    }

    // Extract username from JWT
    private String extractUsername(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid Authorization header");
        }
        String token = authHeader.substring(7);
        return jwtUtil.getUsername(token);
    }
}
