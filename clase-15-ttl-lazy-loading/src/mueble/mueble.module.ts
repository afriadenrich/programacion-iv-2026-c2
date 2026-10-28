import { Module } from '@nestjs/common';
import { MuebleService } from './mueble.service.js';
import { MuebleController } from './mueble.controller.js';

@Module({
  controllers: [MuebleController],
  providers: [MuebleService],
})
export class MuebleModule {}
