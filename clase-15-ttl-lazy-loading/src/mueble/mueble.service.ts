import { Injectable } from '@nestjs/common';
import { CreateMuebleDto } from './dto/create-mueble.dto.js';
import { UpdateMuebleDto } from './dto/update-mueble.dto.js';

@Injectable()
export class MuebleService {
  create(createMuebleDto: CreateMuebleDto) {
    return 'This action adds a new mueble';
  }

  findAll() {
    return `This action returns all mueble`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mueble`;
  }

  update(id: number, updateMuebleDto: UpdateMuebleDto) {
    return `This action updates a #${id} mueble`;
  }

  remove(id: number) {
    return `This action removes a #${id} mueble`;
  }
}
