import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-ejemplo-02',
  styleUrl: './ejemplo-02.css',
  templateUrl: './ejemplo-02.html',
})
export class Ejemplo02 {
  formBuilder = inject(FormBuilder);

  formulario = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', Validators.email],
    direccion: this.formBuilder.group({
      calle: ['', [Validators.required]],
      numero: ['', [Validators.required, Validators.pattern(/^[0-9]/), Validators.max(99999)]],
    }),
    tarjeta: this.formBuilder.group({
      numero: [null, [Validators.required, this.largoExacto(16)]],
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

  // getters
  get nombre() {
    return this.formulario.get('nombre');
  }

  // funciones
  enviar() {
    console.log(this.formulario, this.formulario.valid);
  }

  largoExacto(caracteres: number): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value !== null && String(control.value).length === caracteres
        ? null
        : { largoExacto: true };
    };
  }
}
