import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Quiz, QuizAttempt } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Quizzes Attended' }],
  };
  barChartOptions: ChartConfiguration<'bar'>['options'] = { responsive: true };

  history: QuizAttempt[] = [];
  pagedHistory: QuizAttempt[] = [];
  topQuizzes: Quiz[] = [];
  allQuizzes: Quiz[] = [];

  currentPage = 1;
  itemsPerPage = 5;
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
      this.topQuizzes = quizzes
        .filter((q) => q.status !== 'completed')
        .slice(0, 5);
    });

    this.quizService.getQuizHistory(currentUser.id).subscribe((history) => {
      this.history = history;
      this.setupPagination();
      this.updatePagedHistory();

      this.barChartData.labels = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
      ];
      const monthlyCounts = [0, 0, 0, 0, 0, 5, this.history.length];
      this.barChartData.datasets[0].data = monthlyCounts;
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

  getQuizTitle(quizId: number): string {
    return (
      this.allQuizzes.find((q) => q.id === quizId)?.title || 'Unknown Quiz'
    );
  }

  getQuizById(quizId: number | undefined): Quiz | undefined {
    if (!quizId) return undefined;
    return this.allQuizzes.find((q) => q.id === quizId);
  }

  selectQuizForInfo(attempt: QuizAttempt) {
    this.selectedAttempt = attempt;
  }
}
