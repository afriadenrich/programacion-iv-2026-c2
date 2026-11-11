import { Module } from '@nestjs/common';
import { GrpcModule } from './grpc/grpc.module.js';
import { TcpModule } from './tcp/tcp.module.js';

@Module({
  imports: [GrpcModule, TcpModule],
})
export class AppModule {}
