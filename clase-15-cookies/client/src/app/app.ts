import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  http = inject(HttpClient);

  Registrarse() {
    this.http
      .post('http://localhost:3000/auth/registro', { user: 'HOLA' })
      .subscribe((data: any) => {
        const token = data.token;

        localStorage.setItem('token', token);
      });
  }
  Login() {
    this.http.post('http://localhost:3000/auth/login', { user: 'HOLA' }).subscribe((data: any) => {
      const token = data.token;

      localStorage.setItem('token', token);
    });
  }
  Traer() {
    this.http.get('http://localhost:3000/dibujo').subscribe((data) => {
      console.log(data);
    });
  }
}
