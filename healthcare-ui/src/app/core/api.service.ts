import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);
  private toastService = inject(ToastService);
  private baseUrl = 'http://localhost:8080/api';

  // ── Auth ──
  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data)
      .pipe(catchError(error => this.handleError(error, 'Login failed')));
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, data)
      .pipe(catchError(error => this.handleError(error, 'Registration failed')));
  }

  // ── Dashboard ──
  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dashboard/stats`)
      .pipe(catchError(error => this.handleError(error, 'Failed to fetch dashboard stats')));
  }

  // ── Patients ──
  getPatients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/patients`)
      .pipe(catchError(error => this.handleError(error, 'Failed to fetch patients')));
  }

  getPatientById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/patients/${id}`)
      .pipe(catchError(error => this.handleError(error, 'Failed to fetch patient')));
  }

  addPatient(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/patients`, data)
      .pipe(catchError(error => this.handleError(error, 'Failed to add patient')));
  }

  updatePatient(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/patients/${id}`, data)
      .pipe(catchError(error => this.handleError(error, 'Failed to update patient')));
  }

  deletePatient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/patients/${id}`)
      .pipe(catchError(error => this.handleError(error, 'Failed to delete patient')));
  }

  // ── Doctors ──
  getDoctors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/doctors`)
      .pipe(catchError(error => this.handleError(error, 'Failed to fetch doctors')));
  }

  addDoctor(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/doctors`, data)
      .pipe(catchError(error => this.handleError(error, 'Failed to add doctor')));
  }

  updateDoctor(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/doctors/${id}`, data)
      .pipe(catchError(error => this.handleError(error, 'Failed to update doctor')));
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/doctors/${id}`)
      .pipe(catchError(error => this.handleError(error, 'Failed to delete doctor')));
  }

  // ── Appointments ──
  getAppointments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/appointments`)
      .pipe(catchError(error => this.handleError(error, 'Failed to fetch appointments')));
  }

  addAppointment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/appointments`, data)
      .pipe(catchError(error => this.handleError(error, 'Failed to create appointment')));
  }

  updateAppointment(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/appointments/${id}`, data)
      .pipe(catchError(error => this.handleError(error, 'Failed to update appointment')));
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/appointments/${id}`)
      .pipe(catchError(error => this.handleError(error, 'Failed to delete appointment')));
  }

  // ── Billings ──
  getBillings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/billings`)
      .pipe(catchError(error => this.handleError(error, 'Failed to fetch billings')));
  }

  createBilling(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/billings`, data)
      .pipe(catchError(error => this.handleError(error, 'Failed to create billing')));
  }

  updateBillingStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/billings/${id}/status?status=${status}`, {})
      .pipe(catchError(error => this.handleError(error, 'Failed to update billing status')));
  }

  // ── Pharmacy ──
  getMedicines(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pharmacy`)
      .pipe(catchError(error => this.handleError(error, 'Failed to fetch medicines')));
  }

  addMedicine(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/pharmacy`, data)
      .pipe(catchError(error => this.handleError(error, 'Failed to add medicine')));
  }

  updateStock(id: number, quantity: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/pharmacy/${id}/stock?quantity=${quantity}`, {})
      .pipe(catchError(error => this.handleError(error, 'Failed to update stock')));
  }

  deleteMedicine(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/pharmacy/${id}`)
      .pipe(catchError(error => this.handleError(error, 'Failed to delete medicine')));
  }

  // ── Error Handler (SSR-safe) ──
  private handleError(error: HttpErrorResponse, context: string) {
    let errorMessage = context;

    if (error.status === 0) {
      errorMessage = 'Network error. Please check if the server is running.';
    } else if (error.status === 401) {
      errorMessage = 'Unauthorized. Invalid credentials.';
    } else if (error.status === 403) {
      errorMessage = 'Access forbidden.';
    } else if (error.status === 404) {
      errorMessage = 'Endpoint not found.';
    } else if (error.status === 409) {
      errorMessage = error.error?.message || 'Conflict — resource already exists.';
    } else if (error.status === 500) {
      errorMessage = 'Server error. Please try again later.';
    } else {
      errorMessage = error.error?.message || `${context}: Error ${error.status}`;
    }

    console.error(`Error (${context}):`, error);
    this.toastService.error(errorMessage, 6000);

    return throwError(() => new Error(errorMessage));
  }
}