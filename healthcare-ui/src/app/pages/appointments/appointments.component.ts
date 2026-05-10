import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { ToastService } from '../../core/toast.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent implements OnInit {

  private api = inject(ApiService);
  private toast = inject(ToastService);

  appointments: any[] = [];
  filteredAppointments: any[] = [];
  patients: any[] = [];
  doctors: any[] = [];
  searchTerm = '';
  statusFilter = '';
  isLoading = true;
  showModal = false;
  isEditing = false;

  form: any = this.resetForm();

  ngOnInit() {
    this.loadAll();
  }

  resetForm() {
    return {
      id: null,
      patientId: null,
      patientName: '',
      doctorId: null,
      doctorName: '',
      appointmentDate: '',
      appointmentTime: '',
      status: 'SCHEDULED',
      reason: '',
      notes: ''
    };
  }

  loadAll() {
    this.api.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        this.filteredAppointments = data;
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });

    this.api.getPatients().subscribe({
      next: (data) => { this.patients = data; }
    });

    this.api.getDoctors().subscribe({
      next: (data) => { this.doctors = data; }
    });
  }

  search() {
    const term = this.searchTerm.toLowerCase();
    this.filteredAppointments = this.appointments.filter(a => {
      const matchesSearch = !term ||
        a.patientName?.toLowerCase().includes(term) ||
        a.doctorName?.toLowerCase().includes(term) ||
        a.reason?.toLowerCase().includes(term);
      const matchesStatus = !this.statusFilter || a.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  filterByStatus(status: string) {
    this.statusFilter = status;
    this.search();
  }

  onPatientChange() {
    const patient = this.patients.find(p => p.id === Number(this.form.patientId));
    this.form.patientName = patient ? patient.name : '';
  }

  onDoctorChange() {
    const doctor = this.doctors.find(d => d.id === Number(this.form.doctorId));
    this.form.doctorName = doctor ? doctor.name : '';
  }

  openAddModal() {
    this.form = this.resetForm();
    this.isEditing = false;
    this.showModal = true;
  }

  openEditModal(appointment: any) {
    this.form = { ...appointment };
    this.isEditing = true;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  save() {
    if (!this.form.patientId || !this.form.doctorId || !this.form.appointmentDate || !this.form.appointmentTime) {
      this.toast.warning('Please fill in all required fields');
      return;
    }

    const payload = {
      ...this.form,
      patientId: Number(this.form.patientId),
      doctorId: Number(this.form.doctorId)
    };

    if (this.isEditing) {
      this.api.updateAppointment(this.form.id, payload).subscribe({
        next: () => {
          this.toast.success('Appointment updated successfully');
          this.closeModal();
          this.loadAll();
        }
      });
    } else {
      this.api.addAppointment(payload).subscribe({
        next: () => {
          this.toast.success('Appointment created successfully');
          this.closeModal();
          this.loadAll();
        }
      });
    }
  }

  deleteAppointment(id: number) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.api.deleteAppointment(id).subscribe({
        next: () => {
          this.toast.success('Appointment deleted successfully');
          this.loadAll();
        }
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'COMPLETED': return 'badge-success';
      case 'SCHEDULED': return 'badge-warning';
      case 'CANCELLED': return 'badge-danger';
      default: return 'badge-info';
    }
  }
}
