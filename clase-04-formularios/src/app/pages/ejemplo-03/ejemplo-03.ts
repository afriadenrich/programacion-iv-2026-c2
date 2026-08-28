import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CampoInput } from './campo-input/campo-input';
import { ErrorRequired } from './error-required/error-required';
import { ErrorMinLength } from './error-min-length/error-min-length';

@Component({
  imports: [ReactiveFormsModule, CampoInput, ErrorRequired, ErrorMinLength],
  selector: 'app-ejemplo-03',
  styleUrl: './ejemplo-03.css',
  templateUrl: './ejemplo-03.html',
})
export class Ejemplo03 {
  formBuilder = inject(FormBuilder);

  formulario = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    direccion: this.formBuilder.group({
      calle: ['', [Validators.required]],
      numero: ['', [Validators.required, Validators.pattern(/^[0-9]/), Validators.max(99999)]],
    }),
    tarjeta: this.formBuilder.group({
      numero: [null, [Validators.required, this.largoExacto(16)], Validators.pattern(/^[0-9]/)],
      vencimientoMes: new FormControl<number | null>(null, [
        Validators.pattern(/^[0-9]/),
        Validators.min(1),
        Validators.max(12),
      ]),
      vencimientoAnio: new FormControl<number | null>(null, [
        Validators.pattern(/^[0-9]/),
        Validators.min(26),
        Validators.max(50),
      ]),
      codigo: new FormControl<number | null>(null, [
        Validators.pattern(/^[0-9]/),
        this.largoExacto(3),
        Validators.min(1),
      ]),
    }),
  });

  // funciones
  enviar() {
    console.log(this.formulario, this.formulario.valid);
  }

  largoExacto(caracteres: number): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value !== null && String(control.value).length === caracteres
        ? null
        : { largoExacto: caracteres };
    };
  }
}
