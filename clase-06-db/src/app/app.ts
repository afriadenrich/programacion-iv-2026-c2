import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Db } from './services/db';
import Auto, { AutoPorCrear, AutoPorModificar } from './interfaces/Auto';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  db = inject(Db);

  autos = signal<Auto[]>([]);

  formTraerId = new FormGroup({
    id: new FormControl<number>(0, Validators.required),
  });

  formCrear = new FormGroup({
    marca: new FormControl(''),
    modelo: new FormControl(''),
    precio: new FormControl(''),
  });

  formModificar = new FormGroup({
    id: new FormControl<number>(0, Validators.required),
    marca: new FormControl(''),
    modelo: new FormControl(''),
    precio: new FormControl(''),
  });

  formEliminar = new FormGroup({
    id: new FormControl<number>(0, Validators.required),
  });

  async traer() {
    const autos = await this.db.findAll();

    this.autos.set(autos);
  }

  traerPorId() {
    if (this.formTraerId.value.id) {
      this.db.findById(this.formTraerId.value.id);
    }
  }
  crear() {
    this.db.create(this.formCrear.value as AutoPorCrear);
  }
  update() {
    this.db.update(this.formModificar.value as AutoPorModificar);
  }
  eliminar() {
    if (this.formEliminar.value.id) {
      this.db.delete(this.formEliminar.value.id);
    }
  }
}
