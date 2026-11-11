import { Module } from '@nestjs/common';
import { GrpcService } from './grpc.service.js';
import { GrpcController } from './grpc.controller.js';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GRPC_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'math',
          protoPath: join(import.meta.dirname, 'math', 'math.proto'),
          url: 'localhost:5000',
        },
      },
    ]),
  ],
  controllers: [GrpcController],
  providers: [GrpcService],
})
export class GrpcModule {}
