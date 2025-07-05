package com.encapsulearn.OnlineQuiz_spring.service;

import com.encapsulearn.OnlineQuiz_spring.dto.*;
import com.encapsulearn.OnlineQuiz_spring.entity.*;
import com.encapsulearn.OnlineQuiz_spring.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final QuizResultRepository quizResultRepository;
    private final UserRepository userRepository;

    @Transactional
    public QuizDto createQuiz(QuizDto quizDto) {
        Quiz quiz = new Quiz();
        quiz.setTitle(quizDto.getTitle());
        quiz.setDescription(quizDto.getDescription());
        quiz.setStartTime(quizDto.getStartTime());
        quiz.setEndTime(quizDto.getEndTime());

        List<Question> questions = quizDto.getQuestions().stream().map(qDto -> {
            Question question = new Question();
            question.setContent(qDto.getContent());
            question.setOption1(qDto.getOption1());
            question.setOption2(qDto.getOption2());
            question.setOption3(qDto.getOption3());
            question.setOption4(qDto.getOption4());
            question.setCorrectAnswer(qDto.getCorrectAnswer());
            question.setQuiz(quiz); // Associate question with quiz
            return question;
        }).collect(Collectors.toList());

        quiz.setQuestions(questions);
        Quiz savedQuiz = quizRepository.save(quiz);
        return convertQuizToDto(savedQuiz, true); // Include answers for admin
    }

    public List<QuizDto> getAllQuizzesForAdmin() {
        return quizRepository.findAll().stream()
                .map(quiz -> convertQuizToDto(quiz, true))
                .collect(Collectors.toList());
    }

    public List<QuizDto> getAvailableQuizzesForUser() {
        LocalDateTime now = LocalDateTime.now();
        return quizRepository.findByEndTimeAfter(now).stream()
                .filter(quiz -> quiz.getStartTime().isBefore(now))
                .map(quiz -> convertQuizToDto(quiz, false)) // Do NOT include answers
                .collect(Collectors.toList());
    }

    public QuizDto getQuizForAttempt(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));
        return convertQuizToDto(quiz, false); // No answers for user attempt
    }

    public QuizDto getQuizWithAnswers(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));
        return convertQuizToDto(quiz, true); // Include answers
    }

    @Transactional
    public QuizResultDto submitQuiz(String userEmail, QuizSubmissionDto submissionDto) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found"));
        Quiz quiz = quizRepository.findById(submissionDto.getQuizId()).orElseThrow(() -> new RuntimeException("Quiz not found"));

        int score = 0;
        for (Map.Entry<Long, String> entry : submissionDto.getAnswers().entrySet()) {
            Long questionId = entry.getKey();
            String selectedAnswer = entry.getValue();

            Question question = questionRepository.findById(questionId).orElseThrow(() -> new RuntimeException("Question not found"));
            if (question.getCorrectAnswer().equals(selectedAnswer)) {
                score++;
            }
        }

        QuizResult result = new QuizResult();
        result.setUser(user);
        result.setQuiz(quiz);
        result.setScore(score);
        result.setTotalQuestions(quiz.getQuestions().size());
        result.setSubmittedAt(LocalDateTime.now());
        QuizResult savedResult = quizResultRepository.save(result);

        return convertResultToDto(savedResult);
    }

    public List<QuizResultDto> getResultsForUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found"));
        return quizResultRepository.findByUserId(user.getId()).stream()
                .map(this::convertResultToDto)
                .collect(Collectors.toList());
    }


    // --- Helper Conversion Methods ---
    private QuizDto convertQuizToDto(Quiz quiz, boolean includeAnswers) {
        QuizDto dto = new QuizDto();
        dto.setId(quiz.getId());
        dto.setTitle(quiz.getTitle());
        dto.setDescription(quiz.getDescription());
        dto.setStartTime(quiz.getStartTime());
        dto.setEndTime(quiz.getEndTime());
        dto.setQuestions(quiz.getQuestions().stream()
                .map(q -> convertQuestionToDto(q, includeAnswers))
                .collect(Collectors.toList()));
        return dto;
    }

    private QuestionDto convertQuestionToDto(Question question, boolean includeAnswer) {
        QuestionDto dto = new QuestionDto();
        dto.setId(question.getId());
        dto.setContent(question.getContent());
        dto.setOption1(question.getOption1());
        dto.setOption2(question.getOption2());
        dto.setOption3(question.getOption3());
        dto.setOption4(question.getOption4());
        if (includeAnswer) {
            dto.setCorrectAnswer(question.getCorrectAnswer());
        }
        return dto;
    }

    private QuizResultDto convertResultToDto(QuizResult result) {
        QuizResultDto dto = new QuizResultDto();
        dto.setId(result.getId());
        dto.setQuizId(result.getQuiz().getId());
        dto.setQuizTitle(result.getQuiz().getTitle());
        dto.setScore(result.getScore());
        dto.setTotalQuestions(result.getTotalQuestions());
        dto.setSubmittedAt(result.getSubmittedAt());
        return dto;
    }
}