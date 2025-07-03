import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginError = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(form: NgForm): void {
    if (form.invalid) return;

    const { email, password } = form.value;

    this.authService.login(email, password).subscribe({
      next: (user: User | null) => {
        this.loginError = !user;
      },
      error: () => {
        this.loginError = true;
      },
    });
  }
}
