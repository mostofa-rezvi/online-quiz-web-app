import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AdminQuizCreateComponent } from './components/admin/admin-quiz-create/admin-quiz-create.component';
import { AdminQuizListComponent } from './components/admin/admin-quiz-list/admin-quiz-list.component';
import { QuizResultModalComponent } from './shared/quiz-result-modal/quiz-result-modal.component';
import { QuizInfoModalComponent } from './shared/quiz-info-modal/quiz-info-modal.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { QuizListComponent } from './components/user/quiz-list/quiz-list.component';
import { QuizHistoryComponent } from './components/user/quiz-history/quiz-history.component';
import { QuizTakeComponent } from './components/user/quiz-take/quiz-take.component';
import { SettingsComponent } from './components/user/settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminQuizDetailsModalComponent } from './shared/admin-quiz-details-modal/admin-quiz-details-modal.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    AdminQuizCreateComponent,
    AdminQuizListComponent,
    QuizResultModalComponent,
    QuizInfoModalComponent,
    DashboardComponent,
    ProfileComponent,
    QuizListComponent,
    QuizHistoryComponent,
    QuizTakeComponent,
    SettingsComponent,
    AdminQuizDetailsModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
