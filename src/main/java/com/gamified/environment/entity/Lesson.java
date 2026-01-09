package com.gamified.environment.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "lessons")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description; // Short description of the lesson

    @Column(columnDefinition = "TEXT")
    private String content; // Lesson text or HTML content

    private Integer orderIndex; // Order within the module

    private Integer xpReward; // XP earned upon completion

    // Many lessons → one module
    @ManyToOne
    @JoinColumn(name = "module_id")
    private Module module;

    // One lesson → one quiz (optional)
    @OneToOne(mappedBy = "lesson", cascade = CascadeType.ALL, orphanRemoval = true)
    private Quiz quiz;
}
