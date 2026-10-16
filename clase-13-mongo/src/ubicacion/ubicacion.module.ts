import { Module } from '@nestjs/common';
import { CiudadService } from './ciudad/ciudad.service.js';
import { CiudadController } from './ciudad/ciudad.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Ciudad, CiudadSchema } from './ciudad/entities/ciudad.entity.js';
import { MonumentoController } from './monumento/monumento.controller.js';
import { MonumentoService } from './monumento/monumento.service.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: CiudadSchema,
        name: Ciudad.name, // "Ciudad"
      },
    ]),
  ],
  controllers: [CiudadController, MonumentoController],
  providers: [CiudadService, MonumentoService],
})
export class UbicacionModule {}
