import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMonumentoDto } from './dto/create-monumento.dto.js';
import { UpdateMonumentoDto } from './dto/update-monumento.dto.js';

@Injectable()
export class MonumentoService {
  constructor(
    @InjectModel(Monumento.name) private monumentoModel: Model<Monumento>,
  ) {}

  async create(createMonumentoDto: CreateMonumentoDto) {
    const monumento = new this.monumentoModel(createMonumentoDto);

    return await monumento.save();
  }

  async findAll() {
    return await this.monumentoModel.find();
  }

  async findOne(id: string) {
    return await this.monumentoModel.findById(id);
  }

  async update(id: string, updateMonumentoDto: UpdateMonumentoDto) {
    return await this.monumentoModel.findByIdAndUpdate(id, updateMonumentoDto);
  }

  async remove(id: string) {
    return await this.monumentoModel.findByIdAndDelete(id);
  }
}
