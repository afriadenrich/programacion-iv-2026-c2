import { Pipe, PipeTransform } from '@angular/core';

// Hola mundo cómo están
// Hola mundo cóm...

@Pipe({
  name: 'texoLargo', // <- SELECTOR
})
export class TexoLargoPipe implements PipeTransform {
  // transform(value: unknown, ...args: unknown[]): unknown {
  transform(value: string, largoMaximo: number = 15): string {
    if(value.length > largoMaximo) {
      return value.slice(0,largoMaximo) + "...";
    }

    return value
  }
}
