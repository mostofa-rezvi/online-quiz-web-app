export interface Question {
  id?: number;
  content: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswer?: string; // Optional because it's hidden from users
}
