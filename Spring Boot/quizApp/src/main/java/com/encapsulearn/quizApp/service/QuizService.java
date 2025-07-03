package com.encapsulearn.quizApp.service;

import com.encapsulearn.quizApp.dto.*;
import com.encapsulearn.quizApp.entity.Question;
import com.encapsulearn.quizApp.entity.Quiz;
import com.encapsulearn.quizApp.entity.QuizAttempt;
import com.encapsulearn.quizApp.entity.User;
import com.encapsulearn.quizApp.enums.QuizStatus;
import com.encapsulearn.quizApp.repository.QuizAttemptRepository;
import com.encapsulearn.quizApp.repository.QuizRepository;
import com.encapsulearn.quizApp.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuizService {

  @Autowired
  private QuizRepository quizRepository;
  @Autowired
  private QuizAttemptRepository quizAttemptRepository;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private ObjectMapper objectMapper;

  @Transactional
  public Quiz createQuiz(Quiz quiz) {
    quiz.getQuestions().forEach(question -> question.setQuiz(quiz));
    return quizRepository.save(quiz);
  }

  @Transactional(readOnly = true)
  public List<QuizDto> getAllQuizzes(Optional<String> status) {
    updateQuizStatuses();
    List<Quiz> quizzes;
    if (status.isPresent()) {
      try {
        QuizStatus quizStatus = QuizStatus.valueOf(status.get().toUpperCase());
        quizzes = quizRepository.findByStatus(quizStatus);
      } catch (IllegalArgumentException e) {
        quizzes = quizRepository.findAll();
      }
    } else {
      quizzes = quizRepository.findAll();
    }
    return quizzes.stream().map(this::convertToDto).collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public QuizDto getQuizById(Long id) {
    updateQuizStatuses();
    Quiz quiz = quizRepository.findById(id).orElseThrow(() -> new RuntimeException("Quiz not found"));
    return convertToDto(quiz);
  }

  @Transactional
  public QuizAttempt submitQuiz(QuizSubmissionDto submission, Long userId) {
    User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    Quiz quiz = quizRepository.findById(submission.getQuizId())
        .orElseThrow(() -> new RuntimeException("Quiz not found"));

    int score = 0;
    for (Question question : quiz.getQuestions()) {
      Integer userAnswerIndex = submission.getAnswers().get(String.valueOf(question.getId()));
      if (userAnswerIndex != null && userAnswerIndex == question.getCorrectOptionIndex()) {
        score++;
      }
    }

    QuizAttempt attempt = new QuizAttempt();
    attempt.setUser(user);
    attempt.setQuiz(quiz);
    attempt.setScore(score);
    attempt.setTotalQuestions(quiz.getQuestions().size());
    attempt.setDate(LocalDateTime.now());
    try {
      attempt.setAnswers(objectMapper.writeValueAsString(submission.getAnswers()));
    } catch (JsonProcessingException e) {
      throw new RuntimeException("Could not serialize answers", e);
    }

    quiz.setStatus(QuizStatus.COMPLETED);
    quizRepository.save(quiz);

    return quizAttemptRepository.save(attempt);
  }

  @Transactional(readOnly = true)
  public List<QuizAttemptDto> getQuizHistoryForUser(Long userId) {
    return quizAttemptRepository.findByUserIdOrderByDateDesc(userId)
        .stream().map(this::convertAttemptToDto).collect(Collectors.toList());
  }

  private void updateQuizStatuses() {
    List<Quiz> quizzes = quizRepository.findAll();
    LocalDateTime now = LocalDateTime.now();
    for (Quiz quiz : quizzes) {
      if (quiz.getStatus() != QuizStatus.COMPLETED) {
        if (now.isAfter(quiz.getSchedule()) && now.isBefore(quiz.getSchedule().plusHours(1))) { // Assuming 1 hour
                                                                                                // duration
          quiz.setStatus(QuizStatus.CURRENT);
        } else if (now.isBefore(quiz.getSchedule())) {
          quiz.setStatus(QuizStatus.UPCOMING);
        }
      }
    }
    quizRepository.saveAll(quizzes);
  }

  private QuizDto convertToDto(Quiz quiz) {
    QuizDto quizDto = new QuizDto();
    quizDto.setId(quiz.getId());
    quizDto.setTitle(quiz.getTitle());
    quizDto.setCategory(quiz.getCategory());
    quizDto.setSchedule(quiz.getSchedule());
    quizDto.setStatus(quiz.getStatus());

    List<QuestionDto> questionDtos = quiz.getQuestions().stream().map(question -> {
      QuestionDto questionDto = new QuestionDto();
      questionDto.setId(question.getId());
      questionDto.setText(question.getText());
      questionDto.setOptions(question.getOptions());
      return questionDto;
    }).collect(Collectors.toList());

    quizDto.setQuestions(questionDtos);
    return quizDto;
  }

  private QuizAttemptDto convertAttemptToDto(QuizAttempt attempt) {
    QuizAttemptDto dto = new QuizAttemptDto();
    dto.setId(attempt.getId());
    dto.setQuizId(attempt.getQuiz().getId());
    dto.setQuizTitle(attempt.getQuiz().getTitle());
    dto.setScore(attempt.getScore());
    dto.setTotalQuestions(attempt.getTotalQuestions());
    dto.setDate(attempt.getDate());
    try {
      dto.setAnswers(objectMapper.readValue(attempt.getAnswers(), Object.class));
    } catch (JsonProcessingException e) {
      dto.setAnswers(null);
    }
    return dto;
  }
}