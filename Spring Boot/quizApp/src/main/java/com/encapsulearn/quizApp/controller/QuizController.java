package com.encapsulearn.quizApp.controller;

import com.encapsulearn.quizApp.dto.QuizAttemptDto;
import com.encapsulearn.quizApp.dto.QuizDto;
import com.encapsulearn.quizApp.dto.QuizSubmissionDto;
import com.encapsulearn.quizApp.entity.QuizAttempt;
import com.encapsulearn.quizApp.security.UserDetailsImpl;
import com.encapsulearn.quizApp.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "${web.cors.allowed-origins}", maxAge = 3600)
public class QuizController {

  @Autowired
  private QuizService quizService;

  @GetMapping("/quizzes")
  public ResponseEntity<List<QuizDto>> getAllQuizzes(@RequestParam Optional<String> status) {
    return ResponseEntity.ok(quizService.getAllQuizzes(status));
  }

  @GetMapping("/quizzes/{id}")
  public ResponseEntity<QuizDto> getQuizById(@PathVariable Long id) {
    return ResponseEntity.ok(quizService.getQuizById(id));
  }

  @PostMapping("/quizzes/submit")
  public ResponseEntity<QuizAttempt> submitQuiz(@RequestBody QuizSubmissionDto submission,
      @AuthenticationPrincipal UserDetailsImpl userDetails) {
    QuizAttempt result = quizService.submitQuiz(submission, userDetails.getId());
    return ResponseEntity.ok(result);
  }

  @GetMapping("/history")
  public ResponseEntity<List<QuizAttemptDto>> getQuizHistory(@AuthenticationPrincipal UserDetailsImpl userDetails) {
    return ResponseEntity.ok(quizService.getQuizHistoryForUser(userDetails.getId()));
  }
}