import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  totalUsers = 0;
  totalQuizzes = 0;
  userRoleData: any[] = [];
  colorScheme: Color = {
    name: 'vivid',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.adminService.getAllUsers().subscribe((users) => {
      this.totalUsers = users.length;
      const adminCount = users.filter((u) => u.role === 'ADMIN').length;
      const userCount = users.filter((u) => u.role === 'USER').length;
      this.userRoleData = [
        { name: 'Admins', value: adminCount },
        { name: 'Users', value: userCount },
      ];
    });

    this.adminService.getAllQuizzes().subscribe((quizzes) => {
      this.totalQuizzes = quizzes.length;
    });
  }
}
