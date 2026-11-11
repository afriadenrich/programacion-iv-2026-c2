import { Observable } from 'rxjs';

export interface MathService {
  SumarArray(data: ArrayNumeros): Observable<Numero>;
  Calculos(data: ElementosCalculables): Observable<Calculados>;
  MostrarEnConsola(data: void): void;
}

export interface ArrayNumeros {
  numeros: number[];
}

export interface Numero {
  numero: number;
}

export interface ElementosCalculables {
  numero1: number;
  numero2: number;
}

export interface Calculados {
  suma: number;
  resta: number;
  multiplicacion: number;
  division: number;
}
