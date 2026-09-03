import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Auth } from './services/auth.service';

import { Autos } from './autos/autos/autos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Autos],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Lo inyecto de forma global porque en todas las páginas quiero saber si hay o no sesión
  public authS = inject(Auth);

  cerrar() {
    this.authS.cerrarSesion();
  }
}
