import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProducto } from '../../../interfaces/producto';
import { IUsuario } from '../../../interfaces/usuario';

@Component({
  imports: [FormsModule],
  selector: 'app-crear-usr',
  styleUrl: './crear-usr.css',
  templateUrl: './crear-usr.html',
})
export class CrearUsr {
  onCrear = output<IUsuario>();

  nombre = '';

  crear() {
    this.onCrear.emit({ nombre: this.nombre });
  }
}
