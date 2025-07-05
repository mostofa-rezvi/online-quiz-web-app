package com.encapsulearn.OnlineQuiz_spring.repository;

import com.encapsulearn.OnlineQuiz_spring.entity.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    List<QuizResult> findByUserId(Long userId);
}