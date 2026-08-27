import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule /* FormsModule */],
  selector: 'app-ejemplo-01',
  styleUrl: './ejemplo-01.css',
  templateUrl: './ejemplo-01.html',
})
export class Ejemplo01 {
  // nombre = new FormControl('');
  // nombre2 = '';

  formulario = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', Validators.email),
    direccion: new FormGroup({
      calle: new FormControl('', [Validators.required]),
      numero: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]/),
        Validators.max(99999),
      ]),
    }),
    tarjeta: new FormGroup({
      numero: new FormControl<number | null>(null, [Validators.required, this.largoExacto(16)]),
      vencimientoMes: new FormControl<number | null>(null, [
        Validators.pattern(/^[0-9]/),
        Validators.maxLength(2),
        Validators.min(1),
        Validators.max(12),
      ]),
      vencimientoAnio: new FormControl<number | null>(null, [
        Validators.pattern(/^[0-9]/),
        Validators.maxLength(2),
        Validators.min(26),
        Validators.max(50),
      ]),
      codigo: new FormControl<number | null>(null, [Validators.maxLength(3), Validators.min(1)]),
    }),
  });

  enviar() {
    console.log(this.formulario);
    console.log(this.formulario.valid);
  }

  // Cómo funcionan los validators?
  // 1. Reciben el form control
  // 2. Devuelven un objeto si falla la validación
  // 2. Devuelve null si está todo ok.

  required: ValidatorFn = (control: AbstractControl) => {
    return control.value === ''
      ? {
          required: true,
        }
      : null;
  };

  largoExacto(caracteres: number): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value !== null && String(control.value).length === caracteres
        ? null
        : { largoExacto: true };
    };
  }
}
