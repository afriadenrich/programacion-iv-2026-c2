import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-documentacion',
  styleUrl: './documentacion.css',
  templateUrl: './documentacion.html',
})
export class Documentacion {
  a = 1;
  b = 2;
  c: number;

  constructor() {
    this.c = 3;
  }

  sumar(a: number, b: number) {
    return a + b;
  }

  ngOnInit() {
    console.log('ON INIT');
  }

  ngOnDestroy() {
    console.log('ON DESTROY');
  }
}
