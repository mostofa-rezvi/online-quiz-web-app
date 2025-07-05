import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { QuizManagementComponent } from './quiz-management/quiz-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';

const routes: Routes = [
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'quiz-management', component: QuizManagementComponent },
  { path: 'quiz-management/new', component: CreateQuizComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
