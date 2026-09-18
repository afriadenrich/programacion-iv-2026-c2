import { Service, signal } from '@angular/core';

@Service()
export class Loading {
  imagenCargando = signal<boolean>(false);
}
