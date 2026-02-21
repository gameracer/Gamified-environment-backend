package com.gamified.environment.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "environmental_challenges")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnvironmentalChallenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String difficulty; // EASY | MEDIUM | HARD
    private String category;
    @Column(nullable = false)
    private Integer xpReward;

    @Builder.Default
    @Column(nullable = false)
    private String challengeType = "SYSTEM"; // SYSTEM or COMMUNITY
}
