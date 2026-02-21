package com.gamified.environment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LessonResponse {

    private Long id;
    private String title;
    private String description;
    private String content;
    private Long moduleId;
    private String moduleTitle;
    private Integer xpReward;
    private boolean completed;
    private boolean locked;
    private String fileUrl;
}
