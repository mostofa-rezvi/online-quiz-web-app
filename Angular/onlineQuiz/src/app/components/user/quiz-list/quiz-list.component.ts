import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Available Quizzes';

  allQuizzes: Quiz[] = [];
  filteredQuizzes: Quiz[] = [];

  searchTerm: string = '';
  selectedCategory: string = 'all';
  categories: string[] = [];

  private routeType: 'all' | 'current' | 'upcoming' | 'category' = 'all';
  private routeCategory: string | null = null;
  private subscriptions = new Subscription();

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeSub = this.route.paramMap.subscribe((params) => {
      this.routeType = this.route.snapshot.data['type'];
      this.routeCategory = params.get('category');

      this.loadQuizzes();
    });

    this.subscriptions.add(routeSub);
  }

  loadQuizzes(): void {
    const quizSub = this.quizService.getQuizzes().subscribe((quizzes) => {
      this.allQuizzes = quizzes;
      this.categories = [...new Set(quizzes.map((q) => q.category))];
      this.applyFilters();
    });

    this.subscriptions.add(quizSub);
  }

  applyFilters(): void {
    let quizzes = [...this.allQuizzes];

    switch (this.routeType) {
      case 'current':
        this.pageTitle = 'Current Quizzes';
        quizzes = quizzes.filter((q) => q.status === 'current');
        break;
      case 'upcoming':
        this.pageTitle = 'Upcoming Quizzes';
        quizzes = quizzes.filter((q) => q.status === 'upcoming');
        break;
      case 'category':
        this.pageTitle = `Quizzes in Category: ${this.routeCategory}`;
        quizzes = quizzes.filter(
          (q) =>
            q.category.toLowerCase() === this.routeCategory?.toLowerCase() &&
            q.status !== 'completed'
        );
        break;
      default:
        this.pageTitle = 'All Available Quizzes';
        quizzes = quizzes.filter((q) => q.status !== 'completed');
        break;
    }

    if (this.searchTerm) {
      quizzes = quizzes.filter((q) =>
        q.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.selectedCategory !== 'all') {
      quizzes = quizzes.filter((q) => q.category === this.selectedCategory);
    }

    this.filteredQuizzes = quizzes.sort(
      (a, b) => new Date(a.schedule).getTime() - new Date(b.schedule).getTime()
    );
  }

  getQuizStatusClass(status: 'upcoming' | 'current' | 'completed'): string {
    switch (status) {
      case 'current':
        return 'bg-warning text-dark';
      case 'upcoming':
        return 'bg-info text-dark';
      case 'completed':
        return 'bg-secondary';
      default:
        return 'bg-light text-dark';
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
