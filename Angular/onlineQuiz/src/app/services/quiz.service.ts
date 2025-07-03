import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz, QuizAttempt } from '../models/quiz.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getQuizzes(
    status?: 'upcoming' | 'current' | 'completed'
  ): Observable<Quiz[]> {
    let params = new HttpParams();
    if (status) {
      params = params.append('status', status);
    }
    return this.http.get<Quiz[]>(`${this.apiUrl}/quizzes`, { params });
  }

  getQuizById(id: number): Observable<Quiz | undefined> {
    return this.http.get<Quiz>(`${this.apiUrl}/quizzes/${id}`);
  }

  getQuizHistory(id: number): Observable<QuizAttempt[]> {
    return this.http.get<QuizAttempt[]>(`${this.apiUrl}/history`);
  }

  createQuiz(quiz: Omit<Quiz, 'id'>): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.apiUrl}/admin/quizzes`, quiz);
  }

  submitQuiz(attempt: {
    quizId: number;
    answers: any;
  }): Observable<QuizAttempt> {
    return this.http.post<QuizAttempt>(
      `${this.apiUrl}/quizzes/submit`,
      attempt
    );
  }
}
