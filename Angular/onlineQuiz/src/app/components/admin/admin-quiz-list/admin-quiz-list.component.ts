import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-admin-quiz-list',
  templateUrl: './admin-quiz-list.component.html',
  styleUrls: ['./admin-quiz-list.component.scss'],
})
export class AdminQuizListComponent implements OnInit {
  quizzes: Quiz[] = [];
  selectedQuiz: Quiz | null = null;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe((data) => {
      this.quizzes = data.sort(
        (a, b) =>
          new Date(b.schedule).getTime() - new Date(a.schedule).getTime()
      );
    });
  }

  selectQuiz(quiz: Quiz): void {
    this.selectedQuiz = quiz;
  }
}
