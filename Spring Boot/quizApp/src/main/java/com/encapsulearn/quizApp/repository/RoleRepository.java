package com.encapsulearn.quizApp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.encapsulearn.quizApp.entity.Role;
import com.encapsulearn.quizApp.enums.ERole;

public interface RoleRepository extends JpaRepository<Role, Integer> {
  Optional<Role> findByName(ERole name);
}