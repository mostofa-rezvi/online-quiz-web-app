import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { UserDashboardComponent } from './modules/user/user-dashboard/user-dashboard.component';
import { AvailableQuizzesComponent } from './modules/user/available-quizzes/available-quizzes.component';
import { QuizResultComponent } from './modules/user/quiz-result/quiz-result.component';
import { MyResultsComponent } from './modules/user/my-results/my-results.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    UserDashboardComponent,
    AvailableQuizzesComponent,
    QuizResultComponent,
    MyResultsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgxChartsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
