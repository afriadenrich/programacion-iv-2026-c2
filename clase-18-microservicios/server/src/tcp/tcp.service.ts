import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TcpService {
  constructor(@Inject('TCP_SERVICE') private clienteTCP: ClientProxy) {}

  sumar(body: { numeros: number[] }) {
    const pattern = { cmd: 'sum' };
    return this.clienteTCP.send(pattern, body.numeros);
  }
}
