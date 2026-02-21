package com.gamified.environment.service;

import com.gamified.environment.controller.ModuleController;
import com.gamified.environment.dto.LessonRequest;
import com.gamified.environment.dto.LessonResponse;
import com.gamified.environment.entity.*;
import com.gamified.environment.repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.stream.Collectors;


import java.io.File;
import java.util.*;

@Service
@RequiredArgsConstructor
public class LessonService {

    private final LessonRepository lessonRepository;
    private final ModuleRepository moduleRepository;
    private final UserLessonProgressRepository progressRepo;
    private final GamificationService gamificationService;
    private final FileStorageService fileStorageService;

    public LessonResponse createLesson(Long moduleId, LessonRequest request) {

        LearningModule module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Module not found"
                ));

        Lesson lesson = new Lesson();

        lesson.setTitle(request.getTitle());
        lesson.setDescription(request.getDescription());
        lesson.setContent(request.getContent());
        lesson.setXpReward(request.getXpReward());
        lesson.setOrderIndex(request.getOrderIndex());
        lesson.setPublished(request.isPublished());
        lesson.setModule(module);

        lessonRepository.save(lesson);

        return mapToResponse(lesson, false, false);
    }

    private LessonResponse mapToResponse(
            Lesson lesson,
            boolean completed,
            boolean locked
    ) {
        return LessonResponse.builder()
                .id(lesson.getId())
                .title(lesson.getTitle())
                .description(lesson.getDescription())
                .content(lesson.getContent())
                .moduleId(lesson.getModule().getId())
                .moduleTitle(lesson.getModule().getTitle())
                .xpReward(lesson.getXpReward())
                .completed(completed)
                .locked(locked)
                .fileUrl(lesson.getFileUrl())
                .build();
    }


    // ==============================
    // GET LESSONS WITH LOCK LOGIC
    // ==============================
    public List<LessonResponse> getLessonsByModule(Long moduleId, String username) {

        List<Lesson> lessons =
                lessonRepository.findByModuleIdOrderByOrderIndexAsc(moduleId);

        List<UserLessonProgress> completedLessons =
                progressRepo.findByUsernameAndLesson_Module_Id(username, moduleId);

        Set<Long> completedIds = completedLessons.stream()
                .map(p -> p.getLesson().getId())
                .collect(Collectors.toSet());

        List<LessonResponse> response = new ArrayList<>();

        for (Lesson lesson : lessons) {

            boolean completed = completedIds.contains(lesson.getId());

            boolean locked = false;

            if (lesson.getOrderIndex() > 1) {
                Lesson previousLesson = lessons.stream()
                        .filter(l -> l.getOrderIndex()
                                .equals(lesson.getOrderIndex() - 1))
                        .findFirst()
                        .orElse(null);

                if (previousLesson != null &&
                        !completedIds.contains(previousLesson.getId())) {
                    locked = true;
                }
            }

            response.add(
                    LessonResponse.builder()
                            .id(lesson.getId())
                            .title(lesson.getTitle())
                            .description(lesson.getDescription())
                            .xpReward(lesson.getXpReward())
                            .completed(completed)
                            .locked(locked)
                            .fileUrl(lesson.getFileUrl())
                            .build()
            );
        }

        return response;
    }
    // ==============================
    // GET SINGLE LESSON (For Edit Mode)
    // ==============================
    public LessonResponse getLessonById(Long id) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        return LessonResponse.builder()
                .id(lesson.getId())
                .title(lesson.getTitle())
                .moduleId(lesson.getModule().getId())
                .moduleTitle(lesson.getModule().getTitle())
                .description(lesson.getDescription())
                .content(lesson.getContent()) // Include the HTML content for QuillEditor
                .xpReward(lesson.getXpReward())
                .fileUrl(lesson.getFileUrl())
                // In a single fetch, we usually don't calculate lock logic
                // unless pass a username here too.
                .build();
    }

    // ==============================
    // DELETE LESSON
    // ==============================
    public void deleteLesson(Long id) {
        if (!lessonRepository.existsById(id)) {
            throw new RuntimeException("Lesson not found");
        }
        lessonRepository.deleteById(id);
    }
    // ==============================
    // COMPLETE LESSON
    // ==============================
    public void completeLesson(Long lessonId, String username) {

        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        if (progressRepo
                .findByUsernameAndLessonId(username, lessonId)
                .isPresent()) {
            return;
        }

        progressRepo.save(
                UserLessonProgress.builder()
                        .username(username)
                        .lesson(lesson)
                        .completed(true)
                        .build()
        );

        gamificationService.awardXp(username, lesson.getXpReward());
    }
    public void updateLesson(Long lessonId, LessonRequest request) {

        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        lesson.setTitle(request.getTitle());
        lesson.setDescription(request.getDescription());
        lesson.setContent(request.getContent());
        lesson.setXpReward(request.getXpReward());


        // 🔥 DO NOT change module during edit
        // 🔥 DO NOT remove existing fileUrl

        lessonRepository.save(lesson);
    }

    // ==============================
    // UPLOAD FILE
    // ==============================
    public void uploadLessonFile(Long lessonId, MultipartFile file)
            throws Exception {

        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        String savedFileName = fileStorageService.storeFile(file);

        lesson.setFileName(savedFileName);
        lesson.setFileUrl("/lessons/files/" + savedFileName);

        if (savedFileName.endsWith(".docx")) {
            File physicalFile =
                    fileStorageService.getFilePath(savedFileName).toFile();
            lesson.setContent(
                    fileStorageService.convertDocxToHtml(physicalFile)
            );
        }

        lessonRepository.save(lesson);
    }
}
