import { Component, inject, signal } from '@angular/core';
import { DbService } from '../../services/db.service';
import Auto, { AutoPorCrear, AutoPorModificar } from '../../interfaces/Auto';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

type Accion = 'listar' | 'buscar' | 'crear' | 'modificar' | 'eliminar';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-autos',
  styleUrl: './autos.css',
  templateUrl: './autos.html',
})
export class Autos {
  db = inject(DbService);

  accionActual = signal<Accion>('listar');
  autos = signal<Auto[]>([]);
  autoEncontrado = signal<Auto | null>(null);

  form = new FormGroup({
    id: new FormControl<number | null>(null),
    marca: new FormControl(''),
    modelo: new FormControl(''),
    precio: new FormControl<number | null>(null),
  });

  ngOnInit() {
    this.traerTodos();
  }

  setAccion(accion: Accion) {
    this.accionActual.set(accion);
    this.form.reset();
    this.autoEncontrado.set(null);
    if (accion === 'listar') this.traerTodos();
  }

  async traerTodos() {
    this.autos.set(await this.db.findAll());
  }

  async ejecutarAccion() {
    const val = this.form.value;

    switch (this.accionActual()) {
      case 'buscar':
        if (val.id) this.autoEncontrado.set(await this.db.findById(val.id));
        break;
      case 'crear':
        await this.db.create(val as AutoPorCrear);
        this.traerTodos();
        break;
      case 'modificar':
        await this.db.update(val as AutoPorModificar);
        this.traerTodos();
        break;
      case 'eliminar':
        if (val.id) await this.db.delete(val.id);
        this.traerTodos();
        break;
    }
  }
}
