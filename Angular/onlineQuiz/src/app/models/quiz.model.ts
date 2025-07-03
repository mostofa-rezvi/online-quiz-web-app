import { Question } from './question.model';

export interface Quiz {
  id: number;
  title: string;
  category: string;
  schedule: Date;
  status: 'upcoming' | 'current' | 'completed';
  questions: Question[];
}

export interface QuizAttempt {
  quizId: number;
  userId: number;
  score: number;
  totalQuestions: number;
  date: Date;
  answers: any; // Store user's answers
}
