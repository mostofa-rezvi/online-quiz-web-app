package com.encapsulearn.quizApp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.encapsulearn.quizApp.entity.Quiz;
import com.encapsulearn.quizApp.enums.QuizStatus;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

  List<Quiz> findByStatus(QuizStatus quizStatus);
}