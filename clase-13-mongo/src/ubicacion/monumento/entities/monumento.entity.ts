import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Ciudad, CiudadSchema } from '../../ciudad/entities/ciudad.entity.js';
import { Types } from 'mongoose';

@Schema({ collection: 'Monumentos' })
export class Monumento {
  @Prop()
  nombre: string;

  @Prop({ type: Types.ObjectId, ref: 'Ciudad', required: true })
  ciudad: Types.ObjectId;
}

export const MonumentoSchema = SchemaFactory.createForClass(Monumento);
