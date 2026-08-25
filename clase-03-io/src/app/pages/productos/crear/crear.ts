import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProducto } from '../../../interfaces/producto';

@Component({
  imports: [FormsModule],
  selector: 'app-crear',
  styleUrl: './crear.css',
  templateUrl: './crear.html',
})
export class Crear {
  nombre: string = '';
  precio: number = 0;

  eventoCrearProducto = output<IProducto>();

  crear() {
    const productoNuevo: IProducto = {
      nombre: this.nombre,
      precio: this.precio,
    };

    console.log('1. Enviamos el evento con', productoNuevo);
    this.eventoCrearProducto.emit(productoNuevo);
  }
}
