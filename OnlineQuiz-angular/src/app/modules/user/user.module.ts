import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizAttemptComponent } from './quiz-attempt/quiz-attempt.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [QuizAttemptComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    NgxChartsModule,
  ],
})
export class UserModule {}
