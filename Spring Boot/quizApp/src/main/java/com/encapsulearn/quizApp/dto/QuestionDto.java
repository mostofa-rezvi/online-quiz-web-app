package com.encapsulearn.quizApp.dto;

import lombok.Data;
import java.util.List;

@Data
public class QuestionDto {
  private Long id;
  private String text;
  private List<String> options;
  // correctOptionIndex is intentionally omitted for users
}