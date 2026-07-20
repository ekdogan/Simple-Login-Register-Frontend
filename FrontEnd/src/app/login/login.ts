import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Header } from '../header/header';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService, LoginData } from '../authservice';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, Header],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly authService = inject(AuthService); // Inject our new service
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  readonly loginModel = signal<LoginData>({
    username: '',
    password: '',
  });

  // Getter/Setter wrappers for ngModel binding
  protected get username(): string {
    return this.loginModel().username;
  }

  protected set username(value: string) {
    this.loginModel.update((model) => ({ ...model, username: value }));
  }

  protected get password(): string {
    return this.loginModel().password;
  }

  protected set password(value: string) {
    this.loginModel.update((model) => ({ ...model, password: value }));
  }

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  protected onClickSignUp(): void {
    this.router.navigate(['/signup']);
  }

  protected onClickForgotPassword(): void {
    this.router.navigate(['/layout']);
  }

  protected onClick(): void {
    const payload: LoginData = {
      username: this.username,
      password: this.password,
    };

    this.authService.login(payload).subscribe({
      next: (response) => {
        // Auth success is handled by the tap operator in AuthService
        this.snackBar.open('Welcome back!', 'Dismiss', { duration: 3000 });
        this.router.navigate(['/headerlayout']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        
        // Handle error message gracefully
        const errorMessage = error.error?.message || 'Invalid username or password.';
        this.snackBar.open(errorMessage, 'Close', { duration: 5000 });
      },
    });
  }
}