import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-billings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">Billings & Payments</h1>
        <p class="page-subtitle">Manage patient invoices and payment tracking</p>
      </div>
    </div>

    <div class="card mt-4">
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Appointment ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let b of billings">
              <td>#{{ b.id }}</td>
              <td><strong>{{ b.patientName }}</strong></td>
              <td>{{ b.appointmentId }}</td>
              <td>{{ b.amount }}</td>
              <td>{{ b.billingDate | date:'medium' }}</td>
              <td>
                <span class="status-badge" [class.status-active]="b.status === 'PAID'" [class.status-inactive]="b.status === 'UNPAID'">
                  {{ b.status }}
                </span>
              </td>
              <td>
                <button *ngIf="b.status === 'UNPAID'" class="btn btn-primary btn-sm" (click)="markAsPaid(b.id)">
                  Mark as Paid
                </button>
              </td>
            </tr>
            <tr *ngIf="billings.length === 0">
              <td colspan="7" class="text-center py-4">No billings found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class BillingsComponent implements OnInit {
  private api = inject(ApiService);
  billings: any[] = [];

  ngOnInit() {
    this.loadBillings();
  }

  loadBillings() {
    this.api.getBillings().subscribe(res => this.billings = res);
  }

  markAsPaid(id: number) {
    this.api.updateBillingStatus(id, 'PAID').subscribe(() => this.loadBillings());
  }
}
