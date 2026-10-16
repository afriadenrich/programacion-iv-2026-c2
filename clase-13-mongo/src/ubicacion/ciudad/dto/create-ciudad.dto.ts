import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class Coords {
  @IsNumber()
  @IsNotEmpty()
  lat: number;
  @IsNotEmpty()
  @IsNumber()
  lon: number;
}

export class CreateCiudadDto {
  @IsString()
  @IsNotEmpty()
  nombre: String;

  @IsString()
  @IsNotEmpty()
  provincia: String;

  @Type(() => Coords)
  @ValidateNested()
  coords: Coords;
}
