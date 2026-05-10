import { HttpInterceptorFn, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);
  const http = inject(HttpClient);

  let token: string | null = null;

  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('token');
  }

  console.log('👉 Interceptor Token:', token);
  console.log('👉 Request URL:', req.url);

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      // if (error.status === 401 && isPlatformBrowser(platformId)) {

      //   return http.post<any>('http://localhost:8080/api/refresh', {}, {
      //     withCredentials: true
      //   }).pipe(

      //     switchMap((res) => {
      //       localStorage.setItem('token', res.token);

      //       const newReq = req.clone({
      //         setHeaders: {
      //           Authorization: `Bearer ${res.token}`
      //         }
      //       });

      //       return next(newReq);
      //     }),

      //     catchError(() => {
      //       localStorage.clear();
      //       router.navigate(['/']);
      //       return throwError(() => error);
      //     })
      //   );
      // }

      return throwError(() => error);
    })
  );
};