import { Prop, Schema } from '@nestjs/mongoose';
import { Ciudad } from '../../ciudad/entities/ciudad.entity.js';

@Schema({ collection: 'Monumentos' })
class Monunmento {
  @Prop()
  nombre: string;

  @Prop()
  ciudad: Ciudad;
}
