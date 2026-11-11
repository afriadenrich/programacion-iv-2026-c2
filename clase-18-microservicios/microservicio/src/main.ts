import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'math',
        protoPath: join(import.meta.dirname, 'math.proto'),
        // url: "localhost:3001"
      },
    },
  );
  await app.listen();
}
await bootstrap();
