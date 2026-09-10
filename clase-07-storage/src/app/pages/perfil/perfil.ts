import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { StorageService } from '../../services/storage-service';
import { environment } from '../../../environments/environment';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-perfil',
  styleUrl: './perfil.css',
  templateUrl: './perfil.html',
})
export class Perfil {
  protected authS = inject(Auth);
  dbS = inject(DbService);
  storageS = inject(StorageService);

  rutaBase = `${environment.SUPABASE_URL}/storage/v1/object/public/imagenes/`;

  formulario = new FormGroup({
    nombre: new FormControl<string | null>(null),
    foto: new FormControl<File | null>(null),
  });

  cargarImagen(evento: InputEvent) {
    const elemento = evento.target as HTMLInputElement;
    if (elemento.files) {
      this.formulario.controls.foto.setValue(elemento.files[0]);
    }
  }

  async accion() {
    let fotoURL: string | null = null;
    if (this.formulario.value.foto) {
      fotoURL = await this.storageS.subirArchivo(this.formulario.value.foto);
    }
    this.dbS.modificarUsuario(this.authS.usuarioActual()!.id, {
      nombre: this.formulario.value.nombre!,
      foto: fotoURL,
    });
  }
}
