package com.gamified.environment.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "badges")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Badge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String code; // e.g., ECO_WARRIOR

    private String name; // Display name of the badge

    private String title;

    private String description;

    private String tier; // BRONZE | SILVER | GOLD | DIAMOND
}
