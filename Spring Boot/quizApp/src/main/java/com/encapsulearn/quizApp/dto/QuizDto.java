package com.encapsulearn.quizApp.dto;

import com.encapsulearn.quizApp.enums.QuizStatus;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class QuizDto {
  private Long id;
  private String title;
  private String category;
  private LocalDateTime schedule;
  private QuizStatus status;
  private List<QuestionDto> questions;
}