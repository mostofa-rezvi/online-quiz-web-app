import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from '../environments/environment';

interface JwtResponse {
  token: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  private authToken: string | null = null;
  private isBrowser: boolean;

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.authToken = localStorage.getItem('user_token');

      const storedUser = localStorage.getItem('currentUserData');
      this.currentUserSubject = new BehaviorSubject<User | null>(
        storedUser ? JSON.parse(storedUser) : null
      );
    } else {
      this.currentUserSubject = new BehaviorSubject<User | null>(null);
    }

    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, pass: string): Observable<User | null> {
    return this.http
      .post<JwtResponse>(`${this.apiUrl}/signin`, { email, password: pass })
      .pipe(
        map((response) => {
          if (response?.token && this.isBrowser) {
            const user: User = {
              id: response.id,
              username: response.username,
              email: response.email,
              roles: response.roles,
              role: '', // adjust if needed
            };

            localStorage.setItem('user_token', response.token);
            localStorage.setItem('currentUser', JSON.stringify(response));
            localStorage.setItem('currentUserData', JSON.stringify(user));

            this.authToken = response.token;
            this.currentUserSubject.next(user);
            this.router.navigate(['/dashboard']);
            return user;
          }
          return null;
        })
      );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('user_token');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentUserData');
    }

    this.authToken = null;
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  isAdmin(): boolean {
    return this.currentUserValue?.roles.includes('ROLE_ADMIN') ?? false;
  }

  saveToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('user_token', token);
    }
    this.authToken = token;
  }

  getToken(): string | null {
    if (!this.authToken && this.isBrowser) {
      this.authToken = localStorage.getItem('user_token');
    }
    return this.authToken;
  }
}
