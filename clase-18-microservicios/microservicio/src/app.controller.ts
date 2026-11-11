import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @GrpcMethod('MathService', 'SumarArray')
  SumarArray(data: { numeros: number[] }, metadata: unknown, call: unknown) {
    console.log('DATA', data);
    // console.log('METADATA', metadata);
    // console.log('call', call);

    const resultado = (data.numeros || []).reduce((a, b) => a + b);

    return { numero: resultado };
  }

  @GrpcMethod('MathService', 'Calculos')
  Calculos(data: { numero1: number; numero2: number }): {
    suma: number;
    resta: number;
    multiplicacion: number;
    division: number;
  } {
    const suma = data.numero1 + data.numero2;
    const resta = data.numero1 - data.numero2;
    const multiplicacion = data.numero1 * data.numero2;
    const division = data.numero2 > 0 ? data.numero1 / data.numero2 : 0;

    return { suma, resta, multiplicacion, division };
  }

  @GrpcMethod('MathService', 'MostrarEnConsola')
  MostrarEnConsola(data: void): void {
    console.log('No hay datos');
  }
}
