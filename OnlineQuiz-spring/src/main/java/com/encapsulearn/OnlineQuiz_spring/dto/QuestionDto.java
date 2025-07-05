package com.encapsulearn.OnlineQuiz_spring.dto;

import lombok.Data;

@Data
public class QuestionDto {
    private Long id;
    private String content;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String correctAnswer;
}
