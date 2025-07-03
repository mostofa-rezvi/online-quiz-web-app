import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // In a real app, use a more secure way to store user data/token
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, pass: string) {
    // Mock login logic
    if (email === 'admin@quiz.com' && pass === 'admin123') {
      const adminUser: User = {
        id: 1,
        username: 'Admin User',
        email: 'admin@quiz.com',
        role: 'admin',
      };
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      this.currentUserSubject.next(adminUser);
      this.router.navigate(['/dashboard']);
      return of(adminUser);
    }
    if (email === 'user@quiz.com' && pass === 'user123') {
      const normalUser: User = {
        id: 2,
        username: 'John Doe',
        email: 'user@quiz.com',
        role: 'user',
      };
      localStorage.setItem('currentUser', JSON.stringify(normalUser));
      this.currentUserSubject.next(normalUser);
      this.router.navigate(['/dashboard']);
      return of(normalUser);
    }
    return of(null);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  isAdmin(): boolean {
    return this.currentUserValue?.role === 'admin';
  }
}
