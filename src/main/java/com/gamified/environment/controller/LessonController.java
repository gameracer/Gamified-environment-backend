package com.gamified.environment.controller;

import com.gamified.environment.dto.LessonRequest;
import com.gamified.environment.dto.LessonResponse;
import com.gamified.environment.entity.Lesson;
import com.gamified.environment.security.JwtUtil;
import com.gamified.environment.service.LessonService;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.*;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("/lessons")
@RequiredArgsConstructor
public class LessonController {

    private final LessonService lessonService;
    private final JwtUtil jwtUtil;
    private final com.gamified.environment.service.FileStorageService fileStorageService;

    @PostMapping("/module/{moduleId}")
    @PreAuthorize("hasAnyAuthority('ADMIN','EDUCATOR')")
    public ResponseEntity<LessonResponse> createLesson(
            @PathVariable Long moduleId,
            @RequestBody LessonRequest request,
            @RequestHeader("Authorization") String authHeader) {

        jwtUtil.getUsername(authHeader.substring(7));

        LessonResponse createdLesson =
                lessonService.createLesson(moduleId, request);

        return ResponseEntity.ok(createdLesson);
    }


    @GetMapping("/module/{moduleId}")
    public ResponseEntity<List<LessonResponse>> getLessons(
            @PathVariable Long moduleId,
            @RequestHeader("Authorization") String authHeader) {

        String username = jwtUtil.getUsername(authHeader.substring(7));

        return ResponseEntity.ok(
                lessonService.getLessonsByModule(moduleId, username)
        );
    }
    // ✅ ADD THIS METHOD: Fetch a single lesson by ID
    @GetMapping("/{id}")
    public ResponseEntity<LessonResponse> getLessonById(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader) {

        // Optional: validate user via token if you want to restrict access
        jwtUtil.getUsername(authHeader.substring(7));

        return ResponseEntity.ok(lessonService.getLessonById(id));
    }

    @PostMapping("/{lessonId}/complete")
    public ResponseEntity<?> completeLesson(
            @PathVariable Long lessonId,
            @RequestHeader("Authorization") String authHeader) {

        String username = jwtUtil.getUsername(authHeader.substring(7));

        lessonService.completeLesson(lessonId, username);

        return ResponseEntity.ok("Lesson completed");
    }

    /* ================= UPDATE LESSON (EDIT CASE) ================= */
    @PutMapping("/{lessonId}")
    @PreAuthorize("hasAnyAuthority('ADMIN','EDUCATOR')")
    public ResponseEntity<?> updateLesson(
            @PathVariable Long lessonId,
            @RequestBody LessonRequest request,
            @RequestHeader("Authorization") String authHeader) {

        jwtUtil.getUsername(authHeader.substring(7));

        lessonService.updateLesson(lessonId, request);

        return ResponseEntity.ok("Lesson updated successfully");
    }



    @PostMapping("/{lessonId}/upload")
    @PreAuthorize("hasAnyRole('ADMIN','EDUCATOR')")
    public ResponseEntity<?> uploadFile(
            @PathVariable Long lessonId,
            @RequestParam("file") MultipartFile file) throws Exception {

        lessonService.uploadLessonFile(lessonId, file);

        return ResponseEntity.ok("File uploaded");
    }

    @GetMapping("/files/{fileName}")
    public ResponseEntity<Resource> getFile(
            @PathVariable String fileName,
            @RequestHeader("Authorization") String authHeader)
            throws Exception {

        jwtUtil.getUsername(authHeader.substring(7));

        Path path = fileStorageService.getFilePath(fileName);
        Resource resource = new UrlResource(path.toUri());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }
}
