import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'authToken';
  private decodedToken: any;
  private isBrowser!: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.decodeToken();
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem(this.tokenKey, response.jwt);
        this.decodeToken();
      })
    );
  }

  register(userInfo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userInfo);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.decodedToken = null;
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('token');
    }
    return null;
  }

  get isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  private decodeToken(): void {
    const token = this.getToken();
    if (token) {
      this.decodedToken = jwtDecode(token);
    }
  }

  getUserRole(): 'USER' | 'ADMIN' | null {
    if (!this.decodedToken) return null;
    // Assuming the role is in the 'authorities' claim from Spring Security
    return this.decodedToken.authorities[0]?.authority;
  }

  getUsername(): string | null {
    if (!this.decodedToken) return null;
    return this.decodedToken.sub; // 'sub' is standard for subject (username/email)
  }
}
