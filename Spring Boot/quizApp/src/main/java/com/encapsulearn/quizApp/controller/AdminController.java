package com.encapsulearn.quizApp.controller;

import com.encapsulearn.quizApp.entity.Quiz;
import com.encapsulearn.quizApp.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "${web.cors.allowed-origins}", maxAge = 3600)
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

  @Autowired
  private QuizService quizService;

  @PostMapping("/quizzes")
  public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz) {
    return ResponseEntity.ok(quizService.createQuiz(quiz));
  }
}