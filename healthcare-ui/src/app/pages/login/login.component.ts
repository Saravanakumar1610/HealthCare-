import { Component, OnDestroy, inject } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { AuthService } from '../../core/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;
  showPassword = false;
  private destroy$ = new Subject<void>();

  private apiService = inject(ApiService);
  private authService = inject(AuthService);
  private router = inject(Router);

  login() {
    // Validation
    if (!this.username.trim() || !this.password.trim()) {
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

    this.apiService.login(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          if (res && res.token) {
            this.authService.login(res.token, res.username, res.role, res.fullName || this.username);
            this.isLoading = false;
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'No token received from server';
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.isLoading = false;
          if (err.message) {
            this.errorMessage = err.message;
          } else {
            this.errorMessage = 'Login failed. Please try again.';
          }
        }
      });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  clearError() {
    this.errorMessage = '';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
