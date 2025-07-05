package com.encapsulearn.OnlineQuiz_spring.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}