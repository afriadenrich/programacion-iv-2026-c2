import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { StorageModule } from '@nestjs/storage';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '../.env' })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
