package com.encapsulearn.OnlineQuiz_spring.repository;

import com.encapsulearn.OnlineQuiz_spring.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}