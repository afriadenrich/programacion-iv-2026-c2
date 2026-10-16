import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, mongo, Types } from 'mongoose';
import { CreateMonumentoDto } from './dto/create-monumento.dto.js';
import { UpdateMonumentoDto } from './dto/update-monumento.dto.js';
import { Monumento } from './entities/monumento.entity.js';
import { Ciudad } from '../ciudad/entities/ciudad.entity.js';

@Injectable()
export class MonumentoService {
  constructor(
    @InjectModel(Monumento.name) private monumentoModel: Model<Monumento>,
    @InjectModel(Ciudad.name) private ciudadModel: Model<Ciudad>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async create(createMonumentoDto: CreateMonumentoDto) {
    // const session = await this.connection.startSession();
    // session.startTransaction();

    const ciudadId = new Types.ObjectId(createMonumentoDto.ciudadId);

    // Generar el documento de el monumento
    const monumento = new this.monumentoModel({
      nombre: createMonumentoDto.nombre,
      ciudad: ciudadId,
    });

    // Chequear que la ciudad recibida exista
    const ciudad = await this.ciudadModel.findById(createMonumentoDto.ciudadId);
    // .session(session);

    if (!ciudad) {
      // session.abortTransaction();
      // session.endSession();
      return { mensaje: 'error' };
    }

    // Agregar al array de la ciudad el _id del monumento nuevo
    ciudad?.monumentos.push(monumento._id);

    // guardar ambos
    ciudad?.save(/*{ session } */);
    await monumento.save(/*{ session } */);

    // session.commitTransaction();

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
