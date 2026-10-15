import { Module } from '@nestjs/common';
import { CiudadService } from './ciudad.service.js';
import { CiudadController } from './ciudad.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Ciudad, CiudadSchema } from './entities/ciudad.entity.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: CiudadSchema,
        name: Ciudad.name, // "Ciudad"
      },
    ]),
  ],
  controllers: [CiudadController],
  providers: [CiudadService],
})
export class CiudadModule {}
