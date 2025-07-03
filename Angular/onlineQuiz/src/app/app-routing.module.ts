import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { SettingsComponent } from './components/user/settings/settings.component';
import { QuizListComponent } from './components/user/quiz-list/quiz-list.component';
import { QuizHistoryComponent } from './components/user/quiz-history/quiz-history.component';
import { QuizTakeComponent } from './components/user/quiz-take/quiz-take.component';
import { AdminQuizCreateComponent } from './components/admin/admin-quiz-create/admin-quiz-create.component';
import { AdminQuizListComponent } from './components/admin/admin-quiz-list/admin-quiz-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
      {
        path: 'quizzes/available',
        component: QuizListComponent,
        data: { type: 'all' },
      },
      {
        path: 'quizzes/current',
        component: QuizListComponent,
        data: { type: 'current' },
      },
      {
        path: 'quizzes/upcoming',
        component: QuizListComponent,
        data: { type: 'upcoming' },
      },
      {
        path: 'quizzes/category/:category',
        component: QuizListComponent,
        data: { type: 'category' },
      },
      { path: 'quiz/history', component: QuizHistoryComponent },
      { path: 'quiz/take/:id', component: QuizTakeComponent },

      // Admin Routes
      {
        path: 'admin/quiz/create',
        component: AdminQuizCreateComponent,
        canActivate: [authGuard],
        data: { role: 'admin' },
      },
      {
        path: 'admin/quiz/list',
        component: AdminQuizListComponent,
        canActivate: [authGuard],
        data: { role: 'admin' },
      },
    ],
  },
  { path: '**', redirectTo: 'login' }, // Fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
