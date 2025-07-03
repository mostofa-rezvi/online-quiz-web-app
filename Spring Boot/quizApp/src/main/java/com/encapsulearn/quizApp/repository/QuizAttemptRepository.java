package com.encapsulearn.quizApp.repository;

import com.encapsulearn.quizApp.entity.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
  List<QuizAttempt> findByUserIdOrderByDateDesc(Long userId);
}