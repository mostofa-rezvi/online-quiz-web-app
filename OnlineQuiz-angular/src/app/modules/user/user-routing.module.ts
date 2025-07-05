import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AvailableQuizzesComponent } from './available-quizzes/available-quizzes.component';
import { QuizAttemptComponent } from './quiz-attempt/quiz-attempt.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { MyResultsComponent } from './my-results/my-results.component';

const routes: Routes = [
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'available-quizzes', component: AvailableQuizzesComponent },
  { path: 'attempt/:id', component: QuizAttemptComponent },
  { path: 'result/:id', component: QuizResultComponent },
  { path: 'my-results', component: MyResultsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
