import { Component, OnInit } from '@angular/core';
import { QuizResult } from '../../../models/quiz-result.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-my-results',
  templateUrl: './my-results.component.html',
  styleUrls: ['./my-results.component.scss'],
})
export class MyResultsComponent implements OnInit {
  myResults: QuizResult[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getMyResults().subscribe((data) => {
      this.myResults = data;
    });
  }
}
