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

  // ✅ GET PATIENTS
  getPatients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/patients`)
      .pipe(
        catchError(error => this.handleError(error, 'Failed to fetch patients'))
      );
  }

  // ✅ GET DOCTORS
  getDoctors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/doctors`)
      .pipe(
        catchError(error => this.handleError(error, 'Failed to fetch doctors'))
      );
  }

  // ✅ LOGIN
  login(data: any): Observable<any> {
    console.log('Calling login endpoint:', `${this.baseUrl}/login`);
    return this.http.post(`${this.baseUrl}/login`, data, {
      withCredentials: true   // keep if using cookies, else optional
    })
    .pipe(
      catchError(error => this.handleError(error, 'Login failed'))
    );
  }

addPatient(data: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/patients`, data)
    .pipe(
      catchError(error => this.handleError(error, 'Failed to register patient'))
    );
}
addDoctor(data: any) {
  return this.http.post(`${this.baseUrl}/doctors`, data);
}
  // ✅ FIXED ERROR HANDLER (SSR SAFE)
  private handleError(error: HttpErrorResponse, context: string) {
    let errorMessage = context;

    // ❌ Removed ErrorEvent (not available in SSR)
    if (error.status === 0) {
      errorMessage = 'Network error. Please check if the server is running.';
    } else if (error.status === 401) {
      errorMessage = 'Unauthorized. Invalid credentials.';
    } else if (error.status === 403) {
      errorMessage = 'Access forbidden.';
    } else if (error.status === 404) {
      errorMessage = 'Endpoint not found.';
    } else if (error.status === 500) {
      errorMessage = 'Server error. Please try again later.';
    } else {
      errorMessage = `${context}: Error ${error.status}`;
    }

    console.error(`Error (${context}):`, error);

    // ✅ Show toast
    this.toastService.error(errorMessage, 6000);

    return throwError(() => new Error(errorMessage));
  }
}