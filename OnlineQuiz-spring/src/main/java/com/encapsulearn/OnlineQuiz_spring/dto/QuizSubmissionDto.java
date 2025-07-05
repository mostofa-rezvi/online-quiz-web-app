package com.encapsulearn.OnlineQuiz_spring.dto;

import lombok.Data;
import java.util.Map;

@Data
public class QuizSubmissionDto {
    private Long quizId;
    // Map of <QuestionID, SelectedOption>
    private Map<Long, String> answers;
}