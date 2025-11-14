package com.gamified.environment.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "challenge_submissions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserChallengeSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;   // Who completed the challenge

    private Long challengeId;  // Which challenge was completed

    private String imagePath;  // proof image file path

    private long timestamp;    // when submitted
}
