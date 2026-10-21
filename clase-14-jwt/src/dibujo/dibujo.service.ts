import { Injectable } from '@nestjs/common';
import { CreateDibujoDto } from './dto/create-dibujo.dto.js';
import { UpdateDibujoDto } from './dto/update-dibujo.dto.js';

@Injectable()
export class DibujoService {
  create(createDibujoDto: CreateDibujoDto) {
    return 'This action adds a new dibujo';
  }

  findAll() {
    return `This action returns all dibujo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dibujo`;
  }

  update(id: number, updateDibujoDto: UpdateDibujoDto) {
    return `This action updates a #${id} dibujo`;
  }

  remove(id: number) {
    return `This action removes a #${id} dibujo`;
  }
}
