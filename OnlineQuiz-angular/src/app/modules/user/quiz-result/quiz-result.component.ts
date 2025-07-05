import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizResult } from '../../../models/quiz-result.model';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
})
export class QuizResultComponent implements OnInit {
  result: QuizResult | undefined;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.result = navigation.extras.state['result'];
    }
  }

  ngOnInit(): void {
    if (!this.result) {
      // If user reloads the page, state is lost. Redirect them.
      this.router.navigate(['/user/dashboard']);
    }
  }

  getPercentage(): number {
    if (!this.result) return 0;
    return (this.result.score / this.result.totalQuestions) * 100;
  }
}
