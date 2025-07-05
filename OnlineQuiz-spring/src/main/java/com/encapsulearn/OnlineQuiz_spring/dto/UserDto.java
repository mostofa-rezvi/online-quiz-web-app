package com.encapsulearn.OnlineQuiz_spring.dto;

import com.encapsulearn.OnlineQuiz_spring.enums.Role;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private Role role;
}
