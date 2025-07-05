package com.encapsulearn.OnlineQuiz_spring.controller;

import com.encapsulearn.OnlineQuiz_spring.dto.QuizDto;
import com.encapsulearn.OnlineQuiz_spring.dto.QuizResultDto;
import com.encapsulearn.OnlineQuiz_spring.dto.QuizSubmissionDto;
import com.encapsulearn.OnlineQuiz_spring.dto.UserDto;
import com.encapsulearn.OnlineQuiz_spring.service.QuizService;
import com.encapsulearn.OnlineQuiz_spring.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final QuizService quizService;
    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getUserProfile(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(userService.getUserProfile(email));
    }

    @GetMapping("/quizzes/available")
    public ResponseEntity<List<QuizDto>> getAvailableQuizzes() {
        return ResponseEntity.ok(quizService.getAvailableQuizzesForUser());
    }

    @GetMapping("/quizzes/{id}/attempt")
    public ResponseEntity<QuizDto> getQuizForAttempt(@PathVariable Long id) {
        return ResponseEntity.ok(quizService.getQuizForAttempt(id));
    }

    @PostMapping("/quizzes/submit")
    public ResponseEntity<QuizResultDto> submitQuiz(@RequestBody QuizSubmissionDto submissionDto, Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(quizService.submitQuiz(email, submissionDto));
    }

    @GetMapping("/results")
    public ResponseEntity<List<QuizResultDto>> getMyResults(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(quizService.getResultsForUser(email));
    }
}