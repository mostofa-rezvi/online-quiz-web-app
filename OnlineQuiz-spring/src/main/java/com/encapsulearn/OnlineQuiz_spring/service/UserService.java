package com.encapsulearn.OnlineQuiz_spring.service;

import com.encapsulearn.OnlineQuiz_spring.dto.UserDto;
import com.encapsulearn.OnlineQuiz_spring.entity.User;
import com.encapsulearn.OnlineQuiz_spring.enums.Role;
import com.encapsulearn.OnlineQuiz_spring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public UserDto createAdminUser(UserDto userDto) {
        if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists.");
        }
        User adminUser = new User();
        adminUser.setName(userDto.getName());
        adminUser.setEmail(userDto.getEmail());
        // For security, you might want to send a temporary password via email
        // Here we'll set a default one.
        adminUser.setPassword(passwordEncoder.encode("AdminPassword123!"));
        adminUser.setRole(Role.ADMIN);
        User savedUser = userRepository.save(adminUser);
        return convertToDto(savedUser);
    }

    public UserDto getUserProfile(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return convertToDto(user);
    }

    private UserDto convertToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole());
        return userDto;
    }
}