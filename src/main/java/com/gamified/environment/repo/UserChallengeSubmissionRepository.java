package com.gamified.environment.repo;

import com.gamified.environment.entity.UserChallengeSubmission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserChallengeSubmissionRepository extends JpaRepository<UserChallengeSubmission, Long> {

    Optional<UserChallengeSubmission> findByUsernameAndChallengeId(String username, Long challengeId);
}
