import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TcpService } from './tcp.service.js';

@Controller('tcp')
export class TcpController {
  constructor(private readonly tcpService: TcpService) {}

  @Post('sumar')
  sumar(@Body() body: { numeros: number[] }) {
    return this.tcpService.sumar(body);
  }
}
