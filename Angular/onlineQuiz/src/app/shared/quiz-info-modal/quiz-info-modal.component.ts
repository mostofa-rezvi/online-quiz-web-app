import { Component, Input } from '@angular/core';
import { Quiz, QuizAttempt } from '../../models/quiz.model';

@Component({
  selector: 'app-quiz-info-modal',
  templateUrl: './quiz-info-modal.component.html',
  styleUrls: ['./quiz-info-modal.component.scss'],
})
export class QuizInfoModalComponent {
  @Input() selectedAttempt: QuizAttempt | null = null;
  @Input() selectedQuiz: Quiz | undefined;
}
