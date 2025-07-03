package com.encapsulearn.quizApp.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class QuizAttemptDto {
  private Long id;
  private Long quizId;
  private String quizTitle;
  private int score;
  private int totalQuestions;
  private LocalDateTime date;
  private Object answers; // For flexibility
}