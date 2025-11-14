package com.gamified.environment.repo;

import com.gamified.environment.entity.EnvironmentalChallenge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnvironmentalChallengeRepository extends JpaRepository<EnvironmentalChallenge, Long> {
}
