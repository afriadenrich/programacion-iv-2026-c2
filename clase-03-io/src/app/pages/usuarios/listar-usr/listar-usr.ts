import { Component, input, output } from '@angular/core';
import { IUsuario } from '../../../interfaces/usuario';

@Component({
  imports: [],
  selector: 'app-listar-usr',
  styleUrl: './listar-usr.css',
  templateUrl: './listar-usr.html',
})
export class ListarUsr {
  array = input<IUsuario[]>();

  onEliminar = output<number>();

  eliminar(i: number) {
    this.onEliminar.emit(i);
  }
}
