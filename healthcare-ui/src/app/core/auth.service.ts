import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private loggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  get isLoggedIn$() {
    return this.loggedIn$.asObservable();
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getUsername(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('username') || '';
    }
    return '';
  }

  getRole(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('role') || '';
    }
    return '';
  }

  getFullName(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('fullName') || this.getUsername();
    }
    return '';
  }

  login(token: string, username: string, role: string, fullName: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);
      localStorage.setItem('fullName', fullName);
      localStorage.setItem('loginTime', new Date().toISOString());
      this.loggedIn$.next(true);
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      this.loggedIn$.next(false);
      this.router.navigate(['/']);
    }
  }
}
