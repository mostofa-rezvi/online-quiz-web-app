import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { QuizManagementComponent } from './quiz-management/quiz-management.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    UserManagementComponent,
    QuizManagementComponent,
  ],
  imports: [
    // CRITICAL: CommonModule provides *ngFor, *ngIf, [ngClass], and pipes like |date
    CommonModule,

    // CRITICAL: ReactiveFormsModule provides formGroup, formControlName, etc.
    ReactiveFormsModule,

    AdminRoutingModule,
    NgxChartsModule,
  ],
})
export class AdminModule {}
