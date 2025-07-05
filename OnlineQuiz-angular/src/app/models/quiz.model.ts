import { Question } from './question.model';

export interface Quiz {
  id?: number;
  title: string;
  description: string;
  startTime: string; // Using string for datetime-local input
  endTime: string;
  questions: Question[];
}
