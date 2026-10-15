import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { CiudadModule } from './ciudad/ciudad.module.js';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/progra-2026-c2'), CiudadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
