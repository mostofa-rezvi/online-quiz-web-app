package com.encapsulearn.OnlineQuiz_spring.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
}
