import { Component } from '@angular/core';
import { Listar } from './listar/listar';
import { Crear } from './crear/crear';
import { Modificar } from './modificar/modificar';
import { IProducto } from '../../interfaces/producto';

@Component({
  imports: [Listar, Crear, Modificar],
  selector: 'app-productos',
  styleUrl: './productos.css',
  templateUrl: './productos.html',
})
export default class Productos {
  array: IProducto[] = [
    {
      nombre: 'Agua natural',
      precio: 500,
    },
    {
      nombre: 'Galletitas',
      precio: 500,
    },
  ];

  recibirProductoCreado(productoCreado: IProducto) {
    console.log('2. Recibo el evento solo cuando se ejecuta', productoCreado);
    // this.array.push(productoCreado); Esto no dispara el cambio

    this.array = [...this.array, productoCreado];

    // const aux = this.array;
    // aux.push(productoCreado);

    // this.array = aux;

    console.log('3. Array modificado', this.array);
  }
}
