import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Personaje {
  name: string;
  img: string;
}

export interface Respuesta {
  results: Personaje[];
}

@Service()
export class Api {
  http = inject(HttpClient);

  apiUrl = 'https://api.attackontitanapi.com/character';

  traerPersonaje(nombre: string) {
    const peticion = this.http.get<Respuesta>(this.apiUrl, {
      params: {
        name: nombre,
      },
    });

    return peticion;
  }
}
