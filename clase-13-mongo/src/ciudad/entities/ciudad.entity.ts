import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose from 'mongoose';

class Coords {
  x: number;
  y: number;
}

@Schema() // le da las características de mongo a esta clase
export class Ciudad {
  @Prop() // esta PROPiedad se guarda en la DB
  name: String;

  @Prop()
  province: String;

  @Prop()
  coords: Coords;
}

export const CiudadSchema = SchemaFactory.createForClass(Ciudad);

// const CiudadSchema2 = new mongoose.Schema({
//     name: String,
//     coords: Coords,
//     province: String,
// })
