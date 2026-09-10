import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import IUsuario, { ICrearUsuario } from '../../interfaces/Usuario';
import { StorageService } from '../../services/storage-service';
import { DbService } from '../../services/db.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro {
  authS = inject(Auth);
  storageS = inject(StorageService);
  dbS = inject(DbService);

  formulario = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    foto: new FormControl<File | null>(null, Validators.required),
  });

  cargarImagen(evento: InputEvent) {
    const elemento = evento.target as HTMLInputElement;
    if (elemento.files) {
      this.formulario.controls.foto.setValue(elemento.files[0]);
    }
  }

  async accion() {
    if (this.formulario.valid && this.formulario.value.foto) {
      const imagenURL = await this.storageS.subirArchivo(this.formulario.value.foto);
      if (imagenURL) {
        const { data, error } = await this.authS.registrar(
          this.formulario.value as ICrearUsuario,
          imagenURL,
        );

        if (!error && data.user) {
          this.dbS.crearRegistroUsuario(data.user.id);
        }
      } else {
        // mostrar error
      }
    }
  }
}
