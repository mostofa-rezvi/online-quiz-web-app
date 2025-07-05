import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn && authService.getUserRole() === 'ADMIN') {
    return true;
  }

  router.navigate(['/user/dashboard']); // or some other default page
  return false;
};
