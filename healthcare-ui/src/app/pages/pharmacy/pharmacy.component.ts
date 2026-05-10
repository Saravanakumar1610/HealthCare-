import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-pharmacy',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">Pharmacy & Inventory</h1>
        <p class="page-subtitle">Manage medicine stock and manufacturers</p>
      </div>
    </div>

    <div class="card mt-4">
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Medicine Name</th>
              <th>Manufacturer</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Expiry Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let m of medicines">
              <td>#{{ m.id }}</td>
              <td><strong>{{ m.name }}</strong></td>
              <td>{{ m.manufacturer }}</td>
              <td>{{ m.price }}</td>
              <td>
                <span [class.text-danger]="m.stockQuantity < 10">{{ m.stockQuantity }}</span>
              </td>
              <td>{{ m.expiryDate }}</td>
              <td>
                <button class="btn btn-outline btn-sm" (click)="updateStock(m)">
                  Update Stock
                </button>
              </td>
            </tr>
            <tr *ngIf="medicines.length === 0">
              <td colspan="7" class="text-center py-4">No medicines found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class PharmacyComponent implements OnInit {
  private api = inject(ApiService);
  medicines: any[] = [];

  ngOnInit() {
    this.loadMedicines();
  }

  loadMedicines() {
    this.api.getMedicines().subscribe(res => this.medicines = res);
  }

  updateStock(m: any) {
    const newStock = prompt('Enter new stock quantity:', m.stockQuantity);
    if (newStock !== null) {
      this.api.updateStock(m.id, parseInt(newStock)).subscribe(() => this.loadMedicines());
    }
  }
}
