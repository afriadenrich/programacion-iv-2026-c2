import { Module } from '@nestjs/common';
import { TcpService } from './tcp.service.js';
import { TcpController } from './tcp.controller.js';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TCP_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 5001,
        },
      },
    ]),
  ],
  controllers: [TcpController],
  providers: [TcpService],
})
export class TcpModule {}
