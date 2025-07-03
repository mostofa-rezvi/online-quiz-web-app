package com.encapsulearn.quizApp.dto;

import lombok.Data;
import java.util.Map;

@Data
public class QuizSubmissionDto {
  private Long quizId;
  private Map<String, Integer> answers; // questionId -> selectedOptionIndex
}