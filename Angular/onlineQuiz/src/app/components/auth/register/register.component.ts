import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registrationSuccess = false;

  constructor(private router: Router) {}

  onRegister(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    console.log('Registering user:', form.value);

    this.registrationSuccess = true;

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
