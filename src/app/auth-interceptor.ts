import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './authservice';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); //[cite: 1]
  const token = authService.token(); //[cite: 1]
  const router = inject(Router); //[cite: 1]
  
  // We use a let variable so we can reassign it if a token exists
  let handledReq = req; 

  if (token) { //[cite: 1]
    handledReq = req.clone({ //[cite: 1]
      setHeaders: { //[cite: 1]
        Authorization: `Bearer ${token}` //[cite: 1]
      } //[cite: 1]
    }); //[cite: 1]
    console.log(`Authorization header set with token: ${token}`); //[cite: 1]
  }

  // Pass handledReq (which may or may not be cloned) and attach the catchError
  return next(handledReq).pipe(
    catchError((error: HttpErrorResponse) => { //[cite: 1]
      if (error.status === 401) { //[cite: 1]
        console.warn('Token is invalid or expired. Logging out...'); //[cite: 1]
        authService.logout(); //[cite: 1]
        router.navigate(['/login']); //[cite: 1]
      } //[cite: 1]
      return throwError(() => error); //[cite: 1]
    }) //[cite: 1]
  ); //[cite: 1]
};