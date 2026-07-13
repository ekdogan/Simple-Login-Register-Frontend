import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Header } from '../header/header';
import {MatSnackBar} from '@angular/material/snack-bar';
interface LoginData {
username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, Header],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  readonly loginModel = signal<LoginData>({
    username: '',
    password: '',
  });

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
    console.log('Forgot Password button clicked');
    this.router.navigate(['/layout']);
  }
  protected onClick(): void {
    const payload: LoginData = {
      username: this.loginModel().username,
      password: this.loginModel().password,
    };
    console.log('Sending payload:', payload);

    this.http.post('http://localhost:5233/api/auth/login', payload).subscribe({
      next: (response) => {
        console.log('Login success:', response);/**login logic*/
        this.router.navigate(['/headerlayout']);/** route to header layout on successful login */
      },
      error: (error) => {
        console.error('Login failed:', error);
        if(error.status === 401) {
          this.snackBar.open(error.error.message, 'Close', { });
        }
      },
    });
  }
}
