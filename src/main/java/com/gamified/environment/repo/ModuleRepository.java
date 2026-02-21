package com.gamified.environment.repo;

import com.gamified.environment.entity.LearningModule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModuleRepository extends JpaRepository<LearningModule, Long> {
}
