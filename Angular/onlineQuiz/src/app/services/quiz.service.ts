import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Quiz, QuizAttempt } from '../models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private quizzes: Quiz[] = [
    {
      id: 1,
      title: 'Java Basics',
      category: 'Java',
      schedule: new Date('2024-08-01T10:00:00'),
      status: 'upcoming',
      questions: [
        {
          id: 1,
          text: 'What is a JRE?',
          options: [
            'Java Runtime Env',
            'Java Dev Env',
            'Java Robust Env',
            'None',
          ],
          correctOptionIndex: 0,
        },
        {
          id: 2,
          text: 'What is `final` keyword in Java?',
          options: ['Variable', 'Method', 'Class', 'All of the above'],
          correctOptionIndex: 3,
        },
        {
          id: 3,
          text: 'Is Java platform independent?',
          options: ['Yes', 'No', 'Sometimes', 'Maybe'],
          correctOptionIndex: 0,
        },
        {
          id: 4,
          text: 'What is an object?',
          options: [
            'A blueprint',
            'An instance of a class',
            'A function',
            'A variable',
          ],
          correctOptionIndex: 1,
        },
        {
          id: 5,
          text: 'Default value of byte?',
          options: ['0', '0.0', 'null', 'not defined'],
          correctOptionIndex: 0,
        },
      ],
    },
    {
      id: 2,
      title: 'Python Fundamentals',
      category: 'Python',
      schedule: new Date('2024-07-20T14:00:00'),
      status: 'current',
      questions: [
        {
          id: 1,
          text: 'What is a list in Python?',
          options: [
            'Immutable sequence',
            'Mutable sequence',
            'A number',
            'A string',
          ],
          correctOptionIndex: 1,
        },
        {
          id: 2,
          text: 'How do you start a comment?',
          options: ['//', '/*', '#', '<!--'],
          correctOptionIndex: 2,
        },
        {
          id: 3,
          text: 'Which keyword is used for functions?',
          options: ['function', 'def', 'fun', 'define'],
          correctOptionIndex: 1,
        },
        {
          id: 4,
          text: 'Can you modify a tuple?',
          options: [
            'Yes',
            'No',
            'Only if it has numbers',
            'Only if it has strings',
          ],
          correctOptionIndex: 1,
        },
        {
          id: 5,
          text: 'What does `len()` do?',
          options: [
            'Returns length',
            'Returns type',
            'Converts to list',
            'Deletes item',
          ],
          correctOptionIndex: 0,
        },
      ],
    },
    {
      id: 3,
      title: 'C++ Pointers',
      category: 'C++',
      schedule: new Date('2024-06-15T11:00:00'),
      status: 'completed',
      questions: [
        /* ... questions ... */
      ],
    },
  ];

  private quizAttempts: QuizAttempt[] = [
    {
      quizId: 3,
      userId: 2,
      score: 3,
      totalQuestions: 5,
      date: new Date('2024-06-15T11:30:00'),
      answers: {},
    },
  ];

  constructor() {}

  getQuizzes(
    status?: 'upcoming' | 'current' | 'completed'
  ): Observable<Quiz[]> {
    if (status) {
      return of(this.quizzes.filter((q) => q.status === status));
    }
    return of(this.quizzes);
  }

  getQuizById(id: number): Observable<Quiz | undefined> {
    return of(this.quizzes.find((q) => q.id === id));
  }

  getQuizHistory(userId: number): Observable<QuizAttempt[]> {
    return of(this.quizAttempts.filter((qa) => qa.userId === userId));
  }

  createQuiz(quiz: Quiz): Observable<Quiz> {
    const newId = Math.max(...this.quizzes.map((q) => q.id)) + 1;
    const newQuiz = { ...quiz, id: newId };
    this.quizzes.push(newQuiz);
    console.log('Admin created quiz:', newQuiz);
    return of(newQuiz);
  }

  submitQuiz(attempt: QuizAttempt): Observable<QuizAttempt> {
    // In a real app, calculation would be on the backend
    this.quizAttempts.push(attempt);
    console.log('Quiz submitted:', attempt);
    return of(attempt);
  }
}
