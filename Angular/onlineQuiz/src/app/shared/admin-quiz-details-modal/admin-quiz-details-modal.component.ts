import { Component, Input } from '@angular/core';
import { Quiz } from '../../models/quiz.model';

@Component({
  selector: 'app-admin-quiz-details-modal',
  templateUrl: './admin-quiz-details-modal.component.html',
  styleUrls: ['./admin-quiz-details-modal.component.scss'],
})
export class AdminQuizDetailsModalComponent {
  @Input() quiz: Quiz | null = null;
}
