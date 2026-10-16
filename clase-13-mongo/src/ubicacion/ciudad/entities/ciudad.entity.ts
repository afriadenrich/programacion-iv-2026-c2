import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose from 'mongoose';

class Coords {
  lat: number;
  lon: number;
}

@Schema({ collection: 'Ciudades' }) // le da las características de mongo a esta clase
export class Ciudad {
  @Prop() // esta PROPiedad se guarda en la DB
  nombre: String;

  @Prop()
  provincia: String;

  @Prop()
  coords: Coords;

  // @Prop()
  // monumentos: Monumento[];
}

export const CiudadSchema = SchemaFactory.createForClass(Ciudad);
// const CiudadSchema2 = new mongoose.Schema({
//     name: String,
//     coords: Coords,
//     province: String,
// })
