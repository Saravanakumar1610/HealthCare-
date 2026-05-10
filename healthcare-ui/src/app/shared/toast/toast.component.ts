import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../core/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of toasts; track toast.id) {
        <div class="toast toast-{{ toast.type }}">
          <i class='bx' [ngClass]="{
            'bx-check-circle': toast.type === 'success',
            'bx-error-circle': toast.type === 'error',
            'bx-error': toast.type === 'warning',
            'bx-info-circle': toast.type === 'info'
          }"></i>
          <span class="toast-message">{{ toast.message }}</span>
          <button class="toast-close" (click)="remove(toast.id)">
            <i class='bx bx-x'></i>
          </button>
        </div>
      }
    </div>
  `,
  styles: []
})
export class ToastComponent {
  private toastService = inject(ToastService);
  toasts: Toast[] = [];

  ngOnInit() {
    this.toastService.getToasts().subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  remove(id: string) {
    this.toastService.remove(id);
  }
}
