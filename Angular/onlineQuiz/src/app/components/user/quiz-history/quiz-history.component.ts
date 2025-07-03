import { Component, OnInit } from '@angular/core';
import { Quiz, QuizAttempt } from '../../../models/quiz.model';
import { AuthService } from '../../../services/auth.service';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-quiz-history',
  templateUrl: './quiz-history.component.html',
  styleUrls: ['./quiz-history.component.scss'],
})
export class QuizHistoryComponent implements OnInit {
  history: QuizAttempt[] = [];
  pagedHistory: QuizAttempt[] = [];
  allQuizzes: Quiz[] = [];

  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  pages: number[] = [];

  selectedAttempt: QuizAttempt | null = null;

  constructor(
    private quizService: QuizService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) return;

    this.quizService.getQuizzes().subscribe((quizzes) => {
      this.allQuizzes = quizzes;
    });

    this.quizService.getQuizHistory(currentUser.id).subscribe((history) => {
      this.history = history.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      this.setupPagination();
      this.updatePagedHistory();
    });
  }

  setupPagination() {
    this.totalPages = Math.ceil(this.history.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedHistory();
  }

  updatePagedHistory() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedHistory = this.history.slice(startIndex, endIndex);
  }

  getQuizById(quizId: number | undefined): Quiz | undefined {
    if (!quizId) return undefined;
    return this.allQuizzes.find((q) => q.id === quizId);
  }

  getQuizTitle(quizId: number): string {
    return this.getQuizById(quizId)?.title || 'Unknown Quiz';
  }

  getQuizCategory(quizId: number): string {
    return this.getQuizById(quizId)?.category || 'N/A';
  }

  getPercentage(attempt: QuizAttempt): number {
    return (attempt.score / attempt.totalQuestions) * 100;
  }

  selectQuizForInfo(attempt: QuizAttempt) {
    this.selectedAttempt = attempt;
  }
}
