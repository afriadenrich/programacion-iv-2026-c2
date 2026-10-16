import { Injectable } from '@nestjs/common';
import { CreateCiudadDto } from './dto/create-ciudad.dto.js';
import { UpdateCiudadDto } from './dto/update-ciudad.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Ciudad } from './entities/ciudad.entity.js';
import { Model } from 'mongoose';

@Injectable()
export class CiudadService {
  constructor(@InjectModel(Ciudad.name) private ciudadModel: Model<Ciudad>) {}

  async create(createCiudadDto: CreateCiudadDto) {
    const ciudad = new this.ciudadModel(createCiudadDto);

    return await ciudad.save();
  }

  async findAll() {
    return await this.ciudadModel.find();
  }

  async findOne(id: string) {
    return await this.ciudadModel.findById(id);
  }

  async update(id: string, updateCiudadDto: UpdateCiudadDto) {
    return await this.ciudadModel.findByIdAndUpdate(id, updateCiudadDto);
  }

  async remove(id: string) {
    return await this.ciudadModel.findByIdAndDelete(id);
  }
}
