import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Header } from "../header/header";
interface SignupData {
  username: string;
  password: string;
  email: string;
  FirstName: string;
  LastName: string;
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-signup',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, Header],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})

export class Signup {
private readonly http = inject(HttpClient);
private readonly router = inject(Router);
SignupModel = signal<SignupData>({
    username: '',
    password: '',
    email: '',
    FirstName: '',
    LastName: '',
  });
protected get username(): string {
    return this.SignupModel().username;
  }
protected set username(value: string) {
    this.SignupModel.update((model) => ({ ...model, username: value }));
  }
protected get password(): string {
    return this.SignupModel().password;
  }
protected set password(value: string) {
    this.SignupModel.update((model) => ({ ...model, password: value }));
  }
protected get email(): string {
    return this.SignupModel().email;
  }
protected set email(value: string) {
    this.SignupModel.update((model) => ({ ...model, email: value }));
  }
protected get FirstName(): string {
    return this.SignupModel().FirstName;
  }
protected set FirstName(value: string) {
    this.SignupModel.update((model) => ({ ...model, FirstName: value }));
  }
protected get LastName(): string {
    return this.SignupModel().LastName;
  }
protected set LastName(value: string) {
    this.SignupModel.update((model) => ({ ...model, LastName: value }));
  }
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  public onClickBackToLogin(): void {
    this.router.navigate(['/login']);
  }
  onClickSignUp(): void {
    const payload: SignupData = {
      username: this.SignupModel().username,
      password: this.SignupModel().password,
      email: this.SignupModel().email,
      FirstName: this.SignupModel().FirstName,
      LastName: this.SignupModel().LastName
    };
    console.log('Sending payload:', payload);

    this.http.post('http://localhost:5109/auth/register', payload).subscribe({
      next: (response) => {
        console.log('Registration success:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
      },
    });

    }
emailFormControl = new FormControl('', [Validators.required, Validators.email]);
matcher = new MyErrorStateMatcher();
}
