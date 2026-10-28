import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service.js';

@Module({
  controllers: [],
  providers: [ProductoService],
})
export class ProductoModule {}
