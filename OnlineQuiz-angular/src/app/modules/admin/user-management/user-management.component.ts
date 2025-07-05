import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  allUsers: User[] = [];
  createAdminForm!: FormGroup;

  constructor(private adminService: AdminService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadUsers();
    this.createAdminForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  loadUsers() {
    this.adminService.getAllUsers().subscribe((data) => {
      this.allUsers = data;
    });
  }

  onCreateAdmin() {
    if (this.createAdminForm.valid) {
      this.adminService.createAdmin(this.createAdminForm.value).subscribe({
        next: (newUser) => {
          this.allUsers.push(newUser);
          this.createAdminForm.reset();
          alert('Admin created successfully!');
        },
        error: (err) => {
          alert(`Error: ${err.error.message || 'Could not create admin.'}`);
        },
      });
    }
  }
}
