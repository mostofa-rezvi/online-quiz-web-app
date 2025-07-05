package com.encapsulearn.OnlineQuiz_spring.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class QuizResultDto {
    private Long id;
    private Long quizId;
    private String quizTitle;
    private int score;
    private int totalQuestions;
    private LocalDateTime submittedAt;
}
