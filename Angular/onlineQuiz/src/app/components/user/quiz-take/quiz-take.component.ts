import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { Question } from '../../../models/question.model';
import { Quiz, QuizAttempt } from '../../../models/quiz.model';
import { AuthService } from '../../../services/auth.service';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-quiz-take',
  templateUrl: './quiz-take.component.html',
  styleUrls: ['./quiz-take.component.scss'],
})
export class QuizTakeComponent implements OnInit, OnDestroy {
  quiz: Quiz | undefined;
  isQuizStarted = false;

  timeLeft: number = 0;
  timerSubscription: Subscription | undefined;

  currentQuestions: Question[] = [];
  currentPage = 1;
  questionsPerPage = 5;
  totalPages = 1;

  userAnswers: { [questionId: number]: number } = {};
  quizResult: QuizAttempt | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const quizId = +this.route.snapshot.paramMap.get('id')!;
    this.quizService.getQuizById(quizId).subscribe((q) => {
      this.quiz = q;
      if (this.quiz) {
        this.timeLeft = this.quiz.questions.length * 60;
        this.totalPages = Math.ceil(
          this.quiz.questions.length / this.questionsPerPage
        );
      }
    });
  }

  startQuiz() {
    this.isQuizStarted = true;
    this.updateCurrentQuestions();
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.submitQuiz();
      }
    });
    document.documentElement.requestFullscreen();
  }

  updateCurrentQuestions() {
    const startIndex = (this.currentPage - 1) * this.questionsPerPage;
    const endIndex = startIndex + this.questionsPerPage;
    this.currentQuestions = this.quiz!.questions.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateCurrentQuestions();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateCurrentQuestions();
    }
  }

  selectAnswer(questionId: number, optionIndex: number) {
    this.userAnswers[questionId] = optionIndex;
  }

  submitQuiz() {
    this.timerSubscription?.unsubscribe();
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    // No score calculation on frontend

    const attempt = {
      quizId: this.quiz!.id,
      answers: this.userAnswers,
    };

    this.quizService.submitQuiz(attempt).subscribe((result) => {
      this.quizResult = result;
      // The modal should be triggered from here using Bootstrap's JS API or a service
    });
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }
}
