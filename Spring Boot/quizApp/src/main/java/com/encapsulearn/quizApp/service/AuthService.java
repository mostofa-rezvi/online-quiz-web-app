package com.encapsulearn.quizApp.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.encapsulearn.quizApp.dto.JwtResponse;
import com.encapsulearn.quizApp.dto.LoginRequest;
import com.encapsulearn.quizApp.dto.RegisterRequest;
import com.encapsulearn.quizApp.entity.Role;
import com.encapsulearn.quizApp.entity.User;
import com.encapsulearn.quizApp.enums.ERole;
import com.encapsulearn.quizApp.repository.RoleRepository;
import com.encapsulearn.quizApp.repository.UserRepository;
import com.encapsulearn.quizApp.security.JwtUtils;
import com.encapsulearn.quizApp.security.UserDetailsImpl;

@Service
public class AuthService {

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  public JwtResponse authenticateUser(LoginRequest loginRequest) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());

    return new JwtResponse(jwt,
        userDetails.getId(),
        userDetails.getUsername(),
        userDetails.getEmail(),
        roles);
  }

  public void registerUser(RegisterRequest registerRequest) {
    if (userRepository.existsByUsername(registerRequest.getUsername())) {
      throw new RuntimeException("Error: Username is already taken!");
    }
    if (userRepository.existsByEmail(registerRequest.getEmail())) {
      throw new RuntimeException("Error: Email is already in use!");
    }

    User user = new User(registerRequest.getUsername(),
        registerRequest.getEmail(),
        encoder.encode(registerRequest.getPassword()));

    Set<Role> roles = new HashSet<>();
    Role userRole = roleRepository.findByName(ERole.ROLE_USER)
        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
    roles.add(userRole);

    user.setRoles(roles);
    userRepository.save(user);
  }
}