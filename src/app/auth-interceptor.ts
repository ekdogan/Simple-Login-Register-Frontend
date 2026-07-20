import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './authservice';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); 
  const token = authService.token(); 
  
  let handledReq = req; 

  if (token) {
    handledReq = req.clone({
      setHeaders: { 
        Authorization: `Bearer ${token}`
      } 
    }); 
    console.log(`Authorization header set with token: ${token}`); 
  }

  return next(handledReq).pipe(
    catchError((error: HttpErrorResponse) => { 
      if (error.status === 401) { 
        console.warn('Token is invalid or expired. Logging out...'); 
        // authService.logout() already handles the redirection to /login
        authService.logout(); 
      }
      return throwError(() => error); 
    }) 
  ); 
};