package com.gamified.environment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LessonRequest {

    private String title;
    private String description;
    private String content;
    private Integer xpReward;
    private Integer orderIndex;
    private boolean published;

}