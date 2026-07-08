import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { User } from '@primeicons/angular/user';
interface LoginData {
username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, InputGroupModule, InputGroupAddonModule, InputTextModule, User],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly http = inject(HttpClient);

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

  protected onClick(): void {
    const payload: LoginData = {
      username: this.loginModel().username,
      password: this.loginModel().password,
    };

    console.log('Sending payload:', payload);

    this.http.post('http://localhost:5109/auth/login', payload).subscribe({
      next: (response) => {
        console.log('Login success:', response);
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }
}
