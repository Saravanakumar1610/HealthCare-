import { Component, OnDestroy } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    // Validation
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter username and password';
      return;
    }

    if (this.username.length < 3) {
      this.errorMessage = 'Username must be at least 3 characters';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const data = {
      username: this.username.trim(),
      password: this.password
    };

    console.log("Attempting login with:", data.username);

    this.apiService.login(data)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res: any) => {
          console.log("Login response:", res);
          if (res && res.token) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('username', res.username || this.username);
            localStorage.setItem('loginTime', new Date().toISOString());
            console.log("Token saved to localStorage");
            this.isLoading = false;
            this.errorMessage = '';
            this.router.navigate(['/patients']);
          } else {
            this.errorMessage = '❌ No token in response';
            this.isLoading = false;
          }
        },
        error: (err) => {
          console.error("Login error details:", err);
          this.isLoading = false;
          
          if (err.status === 0) {
            this.errorMessage = '❌ Backend not running on http://localhost:8080';
          } else if (err.status === 401 || err.status === 400) {
            this.errorMessage = '❌ Invalid username or password!';
          } else if (err.status === 403) {
            this.errorMessage = '❌ Access forbidden - Contact administrator';
          } else if (err.status === 500) {
            this.errorMessage = '❌ Server error - Please try again later';
          } else {
            this.errorMessage = `❌ Error: ${err.error?.message || err.statusText}`;
          }
        }
      });
  }

  clearError() {
    this.errorMessage = '';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
