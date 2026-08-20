import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('clase-02-ruteo-bindeos-componentes');

  ngOnInit() {
    console.log('ON INIT APP COMPONENT');
  }

  ngOnDestroy() {
    console.log('ON DESTROY APP COMPONENT'); // ES INUTIL. NUNCA SE DESTRUYE EL APP COMPONENT, para destruirlo hay que cerrar el navegador o la pestaña
  }
}
