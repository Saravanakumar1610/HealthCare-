import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  let token: string | null = null;

  // Only access localStorage in browser environment
  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('token');
  }

  // Add token to Authorization header if it exists
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle 401 Unauthorized - token expired or invalid
      if (error.status === 401 && isPlatformBrowser(platformId)) {
        console.warn('Token expired or invalid - logging out');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.clear();
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};