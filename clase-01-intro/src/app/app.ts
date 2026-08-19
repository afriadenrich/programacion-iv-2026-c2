import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Titulo } from './componentes/titulo/titulo';

@Component({
  selector: 'app-root', // ¿Cómo lo instancio?
  imports: [RouterOutlet, Titulo, RouterLink], // ¿Qué agrego?
  templateUrl: './app.html', // ¿Qué renderizo?
  styleUrl: './app.css', // ¿Qué estilos?
})
export class App {
  numero = 0;

  funcion() {
    this.numero++;
  }
}
