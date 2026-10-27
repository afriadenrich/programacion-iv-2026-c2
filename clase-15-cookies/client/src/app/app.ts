import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

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
      .post(`${environment.API_URL}/auth/registro`, { user: 'HOLA' })
      .subscribe((data: any) => {
        const token = data.token;

        localStorage.setItem('token', token);
      });
  }
  Login() {
    this.http.post(`${environment.API_URL}/auth/login`, { user: 'HOLA' }).subscribe((data: any) => {
      const token = data.token;

      localStorage.setItem('token', token);
    });
  }
  Traer() {
    this.http.get(`${environment.API_URL}/dibujo`).subscribe((data) => {
      console.log(data);
    });
  }
}
