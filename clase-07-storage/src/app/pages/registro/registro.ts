import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import IUsuario, { ICrearUsuario } from '../../interfaces/Usuario';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro {
  authS = inject(Auth);

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

  accion() {
    if (this.formulario.valid) {
      this.authS.registrar(this.formulario.value as ICrearUsuario);
    }
  }
}
