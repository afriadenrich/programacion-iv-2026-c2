import { Component, inject, signal } from '@angular/core';
import { Api, Personaje } from './services/api';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Perfil } from "./components/perfil/perfil";

@Component({
  selector: 'app-root',
  imports: [FormsModule, Perfil],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  //válida @service() y @Injectable()
  api = inject(Api);

  nombre = '';
  personaje = signal<Personaje | null>(null);
  mensaje = signal<string | null>(null);
  suscripcion?: Subscription;

  buscarPersonaje() {
    if (this.nombre) {
      this.suscripcion = this.api.traerPersonaje(this.nombre).subscribe({
        next: (respuesta) => {
          if (respuesta.results && respuesta.results.length > 0) {
            this.personaje.set(respuesta.results[0]);
            this.mensaje.set(null);
          } else {
            this.personaje.set(null);
            this.mensaje.set('No se encontró el personaje');
          }
        },
        error: (err) => {
          this.personaje.set(null);
          this.mensaje.set('Error de conexión con el servidor');
          console.error(err);
        },
      });
    }
  }

  ngOnDestroy() {
    this.suscripcion?.unsubscribe();
  }

  //valida @injectable()
  //constructor(private api: Api) {}
}
