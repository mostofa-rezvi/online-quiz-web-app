import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Quiz } from '../../../models/quiz.model';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-admin-quiz-create',
  templateUrl: './admin-quiz-create.component.html',
  styleUrls: ['./admin-quiz-create.component.scss'],
})
export class AdminQuizCreateComponent implements OnInit {
  quizForm!: FormGroup;
  newQuestionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      schedule: ['', Validators.required],
      questionCount: [5, Validators.required],
      questions: this.fb.array([], Validators.required),
    });

    this.initNewQuestionForm();
  }

  initNewQuestionForm() {
    this.newQuestionForm = this.fb.group({
      text: ['', Validators.required],
      options: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
      ]),
      correctOptionIndex: [null, Validators.required],
    });
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  get newQuestionOptions(): FormArray {
    return this.newQuestionForm.get('options') as FormArray;
  }

  onCountChange() {
    this.questions.clear();
  }

  addQuestion() {
    if (this.newQuestionForm.invalid) return;

    const newQuestion = this.fb.group({
      id: [this.questions.length + 1],
      ...this.newQuestionForm.value,
    });

    this.questions.push(newQuestion);
    this.initNewQuestionForm();
  }

  isQuizReady(): boolean {
    const formValue = this.quizForm.value;
    return (
      formValue.title &&
      formValue.category &&
      formValue.schedule &&
      this.questions.length === formValue.questionCount
    );
  }

  onSubmit() {
    if (!this.isQuizReady()) {
      alert(
        'Please complete the form and add the required number of questions.'
      );
      return;
    }

    const formValue = this.quizForm.value;
    // The Quiz model in Angular already matches the backend DTO well.
    const newQuiz: Omit<Quiz, 'id'> = {
      title: formValue.title,
      category: formValue.category,
      schedule: new Date(formValue.schedule),
      status: 'upcoming', // Backend will manage status, but 'upcoming' is a good default.
      questions: formValue.questions,
    };

    this.quizService.createQuiz(newQuiz).subscribe(() => {
      alert('Quiz created successfully!');
      this.router.navigate(['/admin/quiz/list']);
    });
  }
}
