package com.encapsulearn.quizApp.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.encapsulearn.quizApp.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmail(String email);

  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);
}