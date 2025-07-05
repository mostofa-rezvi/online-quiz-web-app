import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-available-quizzes',
  templateUrl: './available-quizzes.component.html',
  styleUrl: './available-quizzes.component.scss',
})
export class AvailableQuizzesComponent implements OnInit {
  availableQuizzes: Quiz[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAvailableQuizzes().subscribe((data) => {
      this.availableQuizzes = data;
    });
  }
}
