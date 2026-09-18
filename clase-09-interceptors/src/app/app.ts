import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Loading } from './services/loading';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [FormsModule],
  styleUrl: './app.css',
})
export class App {
  readonly API_URL = 'https://api.nasa.gov/planetary/apod';

  httpClient = inject(HttpClient);
  protected loadingService = inject(Loading);

  fecha: string = '';

  imagen = signal<string>('');

  traer() {
    const peticion = this.httpClient.get(this.API_URL, {
      params: {
        date: this.fecha,
      },
    });

    peticion.subscribe((val: any) => {
      this.imagen.set(val.url);
    });
  }
}
