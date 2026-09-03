import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth.service';
import IUsuario from '../../interfaces/Usuario';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  authS = inject(Auth);

  formulario = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    nombre: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  accion() {
    if (this.formulario.valid) {
      this.authS.registrar(this.formulario.value as IUsuario);
    }
  }
}
