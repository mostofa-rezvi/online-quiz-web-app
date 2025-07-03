package com.encapsulearn.quizApp.entity;

import com.encapsulearn.quizApp.enums.QuizStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Quiz {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String title;
  private String category;
  private LocalDateTime schedule;

  @Enumerated(EnumType.STRING)
  private QuizStatus status;

  @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  private List<Question> questions = new ArrayList<>();
}