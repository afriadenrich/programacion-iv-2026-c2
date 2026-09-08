import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth.service';
import IUsuario from '../../interfaces/Usuario';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  auth = inject(Auth);

  formulario = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });

  accion() {
    if (this.formulario.valid) {
      this.auth.loguear(this.formulario.value as IUsuario);
    }
  }
}
