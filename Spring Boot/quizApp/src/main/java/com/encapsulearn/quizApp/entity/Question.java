package com.encapsulearn.quizApp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class Question {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(columnDefinition = "TEXT")
  private String text;

  @ElementCollection(fetch = FetchType.EAGER)
  @CollectionTable(name = "question_options", joinColumns = @JoinColumn(name = "question_id"))
  @Column(name = "option_text", columnDefinition = "TEXT")
  private List<String> options;

  private int correctOptionIndex;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "quiz_id")
  @JsonBackReference
  private Quiz quiz;
}