package com.gamified.environment.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserLessonProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    //set as default false
    private boolean completed = false;

    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;
}
