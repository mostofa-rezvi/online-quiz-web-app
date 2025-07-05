package com.encapsulearn.OnlineQuiz_spring.controller;

import com.encapsulearn.OnlineQuiz_spring.dto.AuthRequest;
import com.encapsulearn.OnlineQuiz_spring.dto.AuthResponse;
import com.encapsulearn.OnlineQuiz_spring.dto.RegisterRequest;
import com.encapsulearn.OnlineQuiz_spring.dto.UserDto;
import com.encapsulearn.OnlineQuiz_spring.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200") // Allow Angular dev server
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}