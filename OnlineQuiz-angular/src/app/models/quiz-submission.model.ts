export interface QuizSubmission {
  quizId: number;
  answers: { [key: number]: string }; // { questionId: selectedOption }
}
