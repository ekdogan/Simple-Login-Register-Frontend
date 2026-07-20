import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './authservice';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token();
  const router = inject(Router);
  // If a token exists, clone the request and add the Authorization header
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(`Authorization header set with token: ${token}`);
    return next(clonedReq);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('Token is invalid or expired. Logging out...');
        authService.logout(); // Wipe client storage
        router.navigate(['/login']); // Boot back to login
      }
      return throwError(() => error);
    })
  );
};