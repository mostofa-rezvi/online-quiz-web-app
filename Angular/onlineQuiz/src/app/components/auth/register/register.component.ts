import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registrationSuccess = false;
  registrationError: string | null = null;

  constructor(private router: Router, private AuthService: AuthService) {}

  onRegister(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.registrationError = null;
    this.AuthService.register(form.value).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.registrationSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.registrationError =
          err.error.message || 'Registration failed. Please try again.';
        console.error(err);
      },
    });
  }
}
