import { Component, input, SimpleChanges } from '@angular/core';
import { IProducto } from '../../../interfaces/producto';

@Component({
  imports: [],
  selector: 'app-listar',
  styleUrl: './listar.css',
  templateUrl: './listar.html',
})
export class Listar {
  productosInput = input<IProducto[]>([]);

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('4. Cambia la entrada del componente hijo por el input del array', changes);
  }
}
