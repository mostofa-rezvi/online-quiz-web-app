// import { CanActivateFn } from '@angular/router';

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // Check for admin role if route requires it
    const requiredRole = route.data['role'];
    if (requiredRole && requiredRole !== authService.currentUserValue?.role) {
      router.navigate(['/dashboard']); // or an unauthorized page
      return false;
    }
    return true;
  }

  router.navigate(['/login']);
  return false;
};
