package com.encapsulearn.quizApp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.encapsulearn.quizApp.entity.Role;
import com.encapsulearn.quizApp.enums.ERole;
import com.encapsulearn.quizApp.repository.RoleRepository;

@Component
public class DataSeeder implements CommandLineRunner {

  @Autowired
  private RoleRepository roleRepository;

  @Override
  public void run(String... args) throws Exception {
    // Check if roles are already in the database
    if (roleRepository.findByName(ERole.ROLE_USER).isEmpty()) {
      roleRepository.save(new Role(ERole.ROLE_USER));
    }
    if (roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) {
      roleRepository.save(new Role(ERole.ROLE_ADMIN));
    }
  }
}