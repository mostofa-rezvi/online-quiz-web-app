import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { UserService } from '../../../services/user.service';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  quizPerformanceData: any[] = [];
  availableQuizzes: Quiz[] = [];
  colorScheme: Color = {
    name: 'vivid',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadQuizPerformance();
    this.loadAvailableQuizzes();
  }

  loadQuizPerformance() {
    this.userService.getMyResults().subscribe((results) => {
      this.quizPerformanceData = results.slice(0, 5).map((r) => ({
        name: r.quizTitle.slice(0, 15) + '...',
        value: (r.score / r.totalQuestions) * 100,
      }));
    });
  }

  loadAvailableQuizzes() {
    this.userService.getAvailableQuizzes().subscribe((quizzes) => {
      this.availableQuizzes = quizzes;
    });
  }
}
