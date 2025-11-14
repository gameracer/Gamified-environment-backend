package com.gamified.environment.controller;

import com.gamified.environment.entity.Lesson;
import com.gamified.environment.entity.Module;
import com.gamified.environment.repo.LessonRepository;
import com.gamified.environment.repo.ModuleRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lessons")
public class LessonController {

    private final LessonRepository lessonRepository;
    private final ModuleRepository moduleRepository;

    public LessonController(LessonRepository lessonRepository, ModuleRepository moduleRepository) {
        this.lessonRepository = lessonRepository;
        this.moduleRepository = moduleRepository;
    }

    // ==========================================
    // GET ALL LESSONS OF A MODULE
    // ==========================================
    @GetMapping("/module/{moduleId}")
    public ResponseEntity<?> getLessonsByModule(@PathVariable Long moduleId) {

        if (!moduleRepository.existsById(moduleId)) {
            return ResponseEntity.badRequest().body("Module not found");
        }

        Module module = moduleRepository.findById(moduleId).get();
        return ResponseEntity.ok(module.getLessons());
    }

    // ==========================================
    // GET LESSON BY ID (FIXED)
    // ==========================================
    @GetMapping("/{id}")
    public ResponseEntity<?> getLessonById(@PathVariable Long id) {

        return lessonRepository.findById(id)
                .map(lesson -> ResponseEntity.ok((Object) lesson))
                .orElseGet(() -> ResponseEntity.badRequest().body("Lesson not found"));
    }

    // ==========================================
    // CREATE LESSON FOR A MODULE
    // ==========================================
    @PostMapping("/module/{moduleId}")
    public ResponseEntity<?> createLesson(
            @PathVariable Long moduleId,
            @RequestBody Lesson lesson
    ) {

        Module module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new RuntimeException("Module not found"));

        lesson.setModule(module);

        lessonRepository.save(lesson);

        return ResponseEntity.ok("Lesson created");
    }

    // ==========================================
    // DELETE LESSON
    // ==========================================
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLesson(@PathVariable Long id) {

        if (!lessonRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Lesson not found");
        }

        lessonRepository.deleteById(id);
        return ResponseEntity.ok("Lesson deleted");
    }
}
