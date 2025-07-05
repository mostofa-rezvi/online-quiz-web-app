package com.encapsulearn.OnlineQuiz_spring.repository;

import com.encapsulearn.OnlineQuiz_spring.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {}
