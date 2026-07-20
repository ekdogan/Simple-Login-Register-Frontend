import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiUrl = 'http://localhost:5233/api/auth';
  private readonly storageKey = 'jwt_token';
  
  private logoutTimer: any; 

  readonly token = signal<string | null>(this.getStoredToken());
  readonly isAuthenticated = signal<boolean>(!!this.token());

  constructor() {
    const currentToken = this.token();
    if (currentToken) {
      this.startTokenTimer(currentToken);
    }
  }

  login(credentials: LoginData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => this.setToken(response.token))
    );
  }

  logout(): void {
    this.setToken(null);
    this.router.navigate(['/login']);
  }
  private startTokenTimer(token: string): void {
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      
      const expirationTime = decodedPayload.exp * 1000;
      const timeLeft = expirationTime - Date.now();

      if (timeLeft <= 0) {
        this.logout();
      } else {
        this.logoutTimer = setTimeout(() => {
          console.warn('Token süresi doldu.');
          this.logout();
        }, timeLeft);
      }
    } catch (error) {
      this.logout();
    }
  }

  // Manuel çıkış yapıldığında arkada çalışan sayacı temizler
  private clearTokenTimer(): void {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = null;
    }
  }

  private getStoredToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    return window.localStorage.getItem(this.storageKey);
  }

  private setToken(token: string | null): void {
    this.token.set(token);
    this.isAuthenticated.set(!!token);

    if (typeof window === 'undefined') {
      return;
    }

    if (token) {
      window.localStorage.setItem(this.storageKey, token);
      this.startTokenTimer(token); // <-- Token geldiğinde sayacı başlat
    } else {
      window.localStorage.removeItem(this.storageKey);
      this.clearTokenTimer(); // <-- Token silindiğinde sayacı durdur
    }
  }
}
