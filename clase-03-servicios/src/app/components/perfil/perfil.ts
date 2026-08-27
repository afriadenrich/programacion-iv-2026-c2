import { Component, inject, signal } from '@angular/core';
import { Github, UsuarioGithub } from '../../services/github';
import { Subscription } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-perfil',
  styleUrl: './perfil.css',
  templateUrl: './perfil.html',
})
export class Perfil {
  github = inject(Github);

  usuario = signal<UsuarioGithub | null>(null);

  suscripcion?: Subscription;

  ngOnInit() {
    this.suscripcion = this.github.traerUsuarioGithub().subscribe({
      next: (respuesta) => {
        if (respuesta) {
          this.usuario.set(respuesta);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnDestroy() {
    this.suscripcion?.unsubscribe();
  }
}
