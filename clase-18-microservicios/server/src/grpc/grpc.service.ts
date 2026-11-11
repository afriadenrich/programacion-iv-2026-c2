import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import {
  ArrayNumeros,
  ElementosCalculables,
  MathService,
  Numero,
} from './math/math.service.js';
import { Observable } from 'rxjs';

@Injectable()
export class GrpcService {
  mathService: MathService;

  constructor(@Inject('GRPC_SERVICE') private clienteGRPC: ClientGrpc) {
    this.mathService = this.clienteGRPC.getService<MathService>('MathService');
  }

  sumar(body: { numeros: number[] }) {
    console.log('sumar', body);
    const resultado = this.sumarGRPC(body);

    return resultado;
    // MathService;
    // SumarArray;
  }

  sumarGRPC(body: ArrayNumeros): Observable<Numero> {
    return this.mathService.SumarArray(body);
  }

  calcular(body: ElementosCalculables) {
    return this.mathService.Calculos(body);
    // MathService;
    // Calculos;
  }

  mostrar() {
    this.mathService.MostrarEnConsola();
    // MathService;
    // MostrarEnConsola;
  }
}
