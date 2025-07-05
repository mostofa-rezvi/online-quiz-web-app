import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../../../models/quiz.model';
import { UserService } from '../../../services/user.service';
import { QuizSubmission } from '../../../models/quiz-submission.model';

@Component({
  selector: 'app-quiz-attempt',
  templateUrl: './quiz-attempt.component.html',
  styleUrls: ['./quiz-attempt.component.scss'],
})
export class QuizAttemptComponent implements OnInit, OnDestroy {
  quiz: Quiz | undefined;
  quizAttemptForm!: FormGroup;
  timer: string = '00:00';
  interval: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const quizId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getQuizForAttempt(quizId).subscribe((data) => {
      this.quiz = data;
      this.buildForm();
      this.startTimer();
    });
  }

  buildForm() {
    const controls: { [key: string]: FormControl } = {};
    this.quiz?.questions.forEach((q) => {
      const controlName = q.id?.toString() ?? '';
      controls[controlName] = this.fb.control('', Validators.required);
    });
    this.quizAttemptForm = this.fb.group(controls);
  }

  startTimer() {
    if (!this.quiz) return;
    const endTime = new Date(this.quiz.endTime).getTime();
    this.interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;
      if (distance < 0) {
        clearInterval(this.interval);
        alert('Time is up! Submitting your quiz.');
        this.submitQuiz();
      } else {
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        this.timer = `${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`;
      }
    }, 1000);
  }

  submitQuiz() {
    clearInterval(this.interval);
    if (this.quizAttemptForm.invalid) {
      alert('Please answer all questions before submitting.');
      return;
    }
    const submission: QuizSubmission = {
      quizId: this.quiz!.id!,
      answers: this.quizAttemptForm.value,
    };
    this.userService.submitQuiz(submission).subscribe((result) => {
      this.router.navigate(['/user/quiz-result'], {
        state: { result: result, quiz: this.quiz },
      });
    });
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  getControlName(id: number | undefined): string {
    if (id === undefined) {
      throw new Error('Question ID is undefined');
    }
    return id.toString();
  }
}
