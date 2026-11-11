import { Body, Controller, Post } from '@nestjs/common';
import { GrpcService } from './grpc.service.js';

@Controller('grpc')
export class GrpcController {
  constructor(private readonly grpcService: GrpcService) {}

  @Post('sumar')
  sumarArray(@Body() body: { numeros: number[] }) {
    return this.grpcService.sumar(body);
  }

  @Post('calculos')
  calculos(@Body() body: { numero1: number; numero2: number }) {
    return this.grpcService.calcular(body);
  }

  @Post('mostrar')
  mostrar() {
    this.grpcService.mostrar();
  }
}
