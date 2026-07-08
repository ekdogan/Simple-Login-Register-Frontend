import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './login/login';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angularapp1.client');
}
