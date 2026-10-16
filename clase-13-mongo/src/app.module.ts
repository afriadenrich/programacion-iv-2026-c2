import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { UbicacionModule } from './ubicacion/ubicacion.module.js';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/progra-2026-c2'),
    UbicacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
