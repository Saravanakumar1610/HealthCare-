import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from './core/auth.service';
import { ToastComponent } from './shared/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MedVault';
  sidebarCollapsed = false;

  authService = inject(AuthService);
  router = inject(Router);
  platformId = inject(PLATFORM_ID);

  get isAuthPage(): boolean {
    const url = this.router.url;
    return url === '/' || url === '/register';
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get username(): string {
    return this.authService.getFullName() || this.authService.getUsername();
  }

  get userRole(): string {
    return this.authService.getRole();
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  logout(): void {
    this.authService.logout();
  }
}
