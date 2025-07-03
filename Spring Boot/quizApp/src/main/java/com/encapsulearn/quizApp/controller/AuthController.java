package com.encapsulearn.quizApp.controller;

import com.encapsulearn.quizApp.dto.JwtResponse;
import com.encapsulearn.quizApp.dto.LoginRequest;
import com.encapsulearn.quizApp.dto.MessageResponse;
import com.encapsulearn.quizApp.dto.RegisterRequest;
import com.encapsulearn.quizApp.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${web.cors.allowed-origins}", maxAge = 3600)
public class AuthController {

  @Autowired
  private AuthService authService;

  @PostMapping("/signin")
  public ResponseEntity<JwtResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
    JwtResponse jwtResponse = authService.authenticateUser(loginRequest);
    return ResponseEntity.ok(jwtResponse);
  }

  @PostMapping("/signup")
  public ResponseEntity<MessageResponse> registerUser(@RequestBody RegisterRequest registerRequest) {
    try {
      authService.registerUser(registerRequest);
      return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
    }
  }
}