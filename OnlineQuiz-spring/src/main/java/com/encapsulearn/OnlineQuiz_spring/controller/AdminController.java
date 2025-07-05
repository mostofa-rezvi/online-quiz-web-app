package com.encapsulearn.OnlineQuiz_spring.controller;

import com.encapsulearn.OnlineQuiz_spring.dto.QuizDto;
import com.encapsulearn.OnlineQuiz_spring.dto.UserDto;
import com.encapsulearn.OnlineQuiz_spring.service.QuizService;
import com.encapsulearn.OnlineQuiz_spring.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@PreAuthorize("hasAuthority('ADMIN')")
public class AdminController {

    private final UserService userService;
    private final QuizService quizService;

    // --- User Management ---
    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/users/create-admin")
    public ResponseEntity<UserDto> createAdmin(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.createAdminUser(userDto), HttpStatus.CREATED);
    }

    // --- Quiz Management ---
    @PostMapping("/quizzes")
    public ResponseEntity<QuizDto> createQuiz(@RequestBody QuizDto quizDto) {
        return new ResponseEntity<>(quizService.createQuiz(quizDto), HttpStatus.CREATED);
    }

    @GetMapping("/quizzes")
    public ResponseEntity<List<QuizDto>> getAllQuizzes() {
        return ResponseEntity.ok(quizService.getAllQuizzesForAdmin());
    }

    @GetMapping("/quizzes/{id}")
    public ResponseEntity<QuizDto> getQuizById(@PathVariable Long id) {
        return ResponseEntity.ok(quizService.getQuizWithAnswers(id));
    }

    // You can add endpoints for update and delete as well
}