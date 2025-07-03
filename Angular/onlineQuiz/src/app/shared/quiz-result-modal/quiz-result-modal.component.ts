import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { QuizAttempt } from '../../models/quiz.model';

@Component({
  selector: 'app-quiz-result-modal',
  templateUrl: './quiz-result-modal.component.html',
  styleUrls: ['./quiz-result-modal.component.scss'],
})
export class QuizResultModalComponent {
  @Input() result: QuizAttempt | null = null;

  constructor(private router: Router) {}

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
