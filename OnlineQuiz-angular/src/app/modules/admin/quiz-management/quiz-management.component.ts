import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-quiz-management',
  templateUrl: './quiz-management.component.html',
  styleUrls: ['./quiz-management.component.scss'],
})
export class QuizManagementComponent implements OnInit {
  allQuizzes: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllQuizzes().subscribe((data) => {
      this.allQuizzes = data;
    });
  }

  getQuizStatus(quiz: any): { text: string; class: string } {
    const now = new Date();
    const start = new Date(quiz.startTime);
    const end = new Date(quiz.endTime);

    if (now < start) return { text: 'Upcoming', class: 'bg-info' };
    if (now >= start && now <= end)
      return { text: 'Active', class: 'bg-success' };
    return { text: 'Finished', class: 'bg-secondary' };
  }
}
