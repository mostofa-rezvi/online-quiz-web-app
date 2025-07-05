package com.encapsulearn.OnlineQuiz_spring.service;

import com.encapsulearn.OnlineQuiz_spring.dto.AuthRequest;
import com.encapsulearn.OnlineQuiz_spring.dto.AuthResponse;
import com.encapsulearn.OnlineQuiz_spring.dto.RegisterRequest;
import com.encapsulearn.OnlineQuiz_spring.dto.UserDto;
import com.encapsulearn.OnlineQuiz_spring.entity.User;
import com.encapsulearn.OnlineQuiz_spring.enums.Role;
import com.encapsulearn.OnlineQuiz_spring.repository.UserRepository;
import com.encapsulearn.OnlineQuiz_spring.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        final UserDetails user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        final String jwt = jwtUtil.generateToken(user);
        return new AuthResponse(jwt);
    }

    public UserDto register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already in use.");
        }
        User newUser = new User();
        newUser.setName(request.getName());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setRole(Role.USER); // Default role is USER
        User savedUser = userRepository.save(newUser);

        UserDto userDto = new UserDto();
        userDto.setId(savedUser.getId());
        userDto.setName(savedUser.getName());
        userDto.setEmail(savedUser.getEmail());
        userDto.setRole(savedUser.getRole());
        return userDto;
    }
}