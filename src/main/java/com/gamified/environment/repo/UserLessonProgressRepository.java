package com.gamified.environment.repo;

import com.gamified.environment.entity.UserLessonProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserLessonProgressRepository
        extends JpaRepository<UserLessonProgress, Long> {

    Optional<UserLessonProgress> findByUsernameAndLessonId(String username, Long lessonId);

    List<UserLessonProgress> findByUsernameAndLesson_Module_Id(String username, Long moduleId);
}
