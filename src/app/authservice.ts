import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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
  private readonly apiUrl = 'http://localhost:5233/api/auth';
  private readonly storageKey = 'jwt_token';

  readonly token = signal<string | null>(this.getStoredToken());
  readonly isAuthenticated = signal<boolean>(!!this.token());

  login(credentials: LoginData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => this.setToken(response.token))
    );
  }

  logout(): void {
    this.setToken(null);
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
    } else {
      window.localStorage.removeItem(this.storageKey);
    }
  }
}
