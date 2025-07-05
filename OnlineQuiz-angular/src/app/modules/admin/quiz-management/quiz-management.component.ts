import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-management',
  templateUrl: './quiz-management.component.html',
  styleUrls: ['./quiz-management.component.scss'],
})
export class QuizManagementComponent implements OnInit {
  // Use the specific Quiz model for better type safety
  allQuizzes: Quiz[] = [];
  isLoading = true; // Add a loading flag for better UX
  errorMessage = ''; // To show potential errors

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllQuizzes().subscribe({
      next: (data) => {
        this.allQuizzes = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load quizzes. Please try again later.';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  // No changes to this function, it's correct.
  getQuizStatus(quiz: Quiz): { text: string; class: string } {
    const now = new Date();
    // Ensure startTime and endTime are treated as Date objects
    const start = new Date(quiz.startTime);
    const end = new Date(quiz.endTime);

    if (now < start) {
      return { text: 'Upcoming', class: 'bg-info' };
    }
    if (now >= start && now <= end) {
      return { text: 'Active', class: 'bg-success' };
    }
    return { text: 'Finished', class: 'bg-secondary' };
  }
}
