import { Module } from '@nestjs/common';
import { DibujoService } from './dibujo.service.js';
import { DibujoController } from './dibujo.controller.js';

@Module({
  controllers: [DibujoController],
  providers: [DibujoService],
})
export class DibujoModule {}
