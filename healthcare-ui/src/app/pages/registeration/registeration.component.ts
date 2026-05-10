import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'app-registeration',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './registeration.component.html',
  styleUrl: './registeration.component.css'
})
export class RegisterComponent {

  private api = inject(ApiService);
  private router = inject(Router);
  private toast = inject(ToastService);

  isLoading = false;
  showPassword = false;

  form = {
    username: '',
    password: '',
    email: '',
    fullName: '',
    role: 'PATIENT'
  };

  errors: any = {};

  validate(): boolean {
    this.errors = {};

    if (!this.form.fullName.trim()) {
      this.errors.fullName = 'Full name is required';
    }

    if (!this.form.username.trim()) {
      this.errors.username = 'Username is required';
    } else if (this.form.username.length < 3) {
      this.errors.username = 'Username must be at least 3 characters';
    }

    if (!this.form.email.trim()) {
      this.errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
      this.errors.email = 'Please enter a valid email';
    }

    if (!this.form.password) {
      this.errors.password = 'Password is required';
    } else if (this.form.password.length < 6) {
      this.errors.password = 'Password must be at least 6 characters';
    }

    return Object.keys(this.errors).length === 0;
  }

  submit() {
    if (!this.validate()) return;

    this.isLoading = true;

    this.api.register(this.form).subscribe({
      next: () => {
        this.isLoading = false;
        this.toast.success('Account created successfully! Please sign in.');
        this.router.navigate(['/']);
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}