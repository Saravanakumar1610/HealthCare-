import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { ToastService } from '../../core/toast.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent implements OnInit {

  private api = inject(ApiService);
  private toast = inject(ToastService);

  patients: any[] = [];
  filteredPatients: any[] = [];
  searchTerm = '';
  isLoading = true;
  showModal = false;
  isEditing = false;

  form: any = this.resetForm();

  ngOnInit() {
    this.loadPatients();
  }

  resetForm() {
    return {
      id: null,
      name: '',
      age: null,
      disease: '',
      doctorAssigned: '',
      phone: '',
      email: '',
      gender: '',
      status: 'ACTIVE'
    };
  }

  loadPatients() {
    this.api.getPatients().subscribe({
      next: (data) => {
        this.patients = data;
        this.filteredPatients = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  search() {
    const term = this.searchTerm.toLowerCase();
    this.filteredPatients = this.patients.filter(p =>
      p.name?.toLowerCase().includes(term) ||
      p.disease?.toLowerCase().includes(term) ||
      p.doctorAssigned?.toLowerCase().includes(term)
    );
  }

  openAddModal() {
    this.form = this.resetForm();
    this.isEditing = false;
    this.showModal = true;
  }

  openEditModal(patient: any) {
    this.form = { ...patient };
    this.isEditing = true;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  save() {
    if (!this.form.name || !this.form.disease) {
      this.toast.warning('Please fill in required fields (Name, Disease)');
      return;
    }

    const payload = {
      ...this.form,
      age: Number(this.form.age)
    };

    if (this.isEditing) {
      this.api.updatePatient(this.form.id, payload).subscribe({
        next: () => {
          this.toast.success('Patient updated successfully');
          this.closeModal();
          this.loadPatients();
        }
      });
    } else {
      this.api.addPatient(payload).subscribe({
        next: () => {
          this.toast.success('Patient added successfully');
          this.closeModal();
          this.loadPatients();
        }
      });
    }
  }

  deletePatient(id: number) {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.api.deletePatient(id).subscribe({
        next: () => {
          this.toast.success('Patient deleted successfully');
          this.loadPatients();
        }
      });
    }
  }
}