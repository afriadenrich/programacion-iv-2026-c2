import { Timestamp } from 'rxjs';

export default interface Auto {
  id: number;
  created_at: Timestamp<any>;
  marca: string | null;
  modelo: string | null;
  precio: number | null;
}

export interface AutoPorCrear {
  marca: string | null;
  modelo: string | null;
  precio: number | null;
}
export interface AutoPorModificar {
  id: number;
  marca: string | null;
  modelo: string | null;
  precio: number | null;
}
