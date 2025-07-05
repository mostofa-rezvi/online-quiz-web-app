import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QuizSubmission } from '../models/quiz-submission.model';
import { QuizResult } from '../models/quiz-result.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

  getAvailableQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}/quizzes/available`);
  }

  getQuizForAttempt(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.baseUrl}/quizzes/${id}/attempt`);
  }

  submitQuiz(submission: QuizSubmission): Observable<QuizResult> {
    return this.http.post<QuizResult>(
      `${this.baseUrl}/quizzes/submit`,
      submission
    );
  }

  getMyResults(): Observable<QuizResult[]> {
    return this.http.get<QuizResult[]>(`${this.baseUrl}/results`);
  }
}
