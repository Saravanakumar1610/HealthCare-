import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { ToastService } from '../../core/toast.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit {

  private api = inject(ApiService);
  private toast = inject(ToastService);

  doctors: any[] = [];
  filteredDoctors: any[] = [];
  searchTerm = '';
  isLoading = true;
  showModal = false;
  isEditing = false;

  form: any = this.resetForm();

  ngOnInit() {
    this.loadDoctors();
  }

  resetForm() {
    return {
      id: null,
      name: '',
      specialization: '',
      email: '',
      phone: '',
      qualification: '',
      experienceYears: null,
      gender: '',
      status: 'ACTIVE'
    };
  }

  loadDoctors() {
    this.api.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.filteredDoctors = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  search() {
    const term = this.searchTerm.toLowerCase();
    this.filteredDoctors = this.doctors.filter(d =>
      d.name?.toLowerCase().includes(term) ||
      d.specialization?.toLowerCase().includes(term) ||
      d.email?.toLowerCase().includes(term)
    );
  }

  openAddModal() {
    this.form = this.resetForm();
    this.isEditing = false;
    this.showModal = true;
  }

  openEditModal(doctor: any) {
    this.form = { ...doctor };
    this.isEditing = true;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  save() {
    if (!this.form.name || !this.form.specialization || !this.form.email || !this.form.phone) {
      this.toast.warning('Please fill in all required fields');
      return;
    }

    if (this.isEditing) {
      this.api.updateDoctor(this.form.id, this.form).subscribe({
        next: () => {
          this.toast.success('Doctor updated successfully');
          this.closeModal();
          this.loadDoctors();
        }
      });
    } else {
      this.api.addDoctor(this.form).subscribe({
        next: () => {
          this.toast.success('Doctor added successfully');
          this.closeModal();
          this.loadDoctors();
        }
      });
    }
  }

  deleteDoctor(id: number) {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.api.deleteDoctor(id).subscribe({
        next: () => {
          this.toast.success('Doctor deleted successfully');
          this.loadDoctors();
        }
      });
    }
  }
}
