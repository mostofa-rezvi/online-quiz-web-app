package com.encapsulearn.OnlineQuiz_spring.repository;

import com.encapsulearn.OnlineQuiz_spring.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findByEndTimeAfter(LocalDateTime currentTime); // For upcoming/current
    List<Quiz> findByEndTimeBefore(LocalDateTime currentTime); // For past
}
