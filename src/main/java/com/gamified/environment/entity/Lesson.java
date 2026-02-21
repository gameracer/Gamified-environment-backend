package com.gamified.environment.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    private String description;

    @Column(columnDefinition = "TEXT")
    private String content;

    private Integer orderIndex;

    private Integer xpReward;

    // 🔥 NEW: File support
    private String fileName;

    private String fileUrl;

    private boolean published = false;
    private boolean draft=true;


    // Many lessons → one module
    @ManyToOne
    @JoinColumn(name = "module_id")
    @JsonIgnore   // 🔥 Prevent infinite loop
    private LearningModule module;

    // One lesson → one quiz
    @OneToOne(mappedBy = "lesson", cascade = CascadeType.ALL, orphanRemoval = true)
    private Quiz quiz;
}
