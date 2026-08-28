import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-ejemplo-04',
  styleUrl: './ejemplo-04.css',
  templateUrl: './ejemplo-04.html',
})
export class Ejemplo04 {
  formBuilder = inject(FormBuilder);
  formulario = this.formBuilder.array([new FormControl('')]);

  agregar() {
    this.formulario.push(new FormControl(''));
  }

  quitar() {
    this.formulario.removeAt(this.formulario.length - 1);
  }

  mostrar() {
    console.log(this.formulario);
    console.log(this.formulario.value);
    console.log(this.formulario.valid);
  }
}
