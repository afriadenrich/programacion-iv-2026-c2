import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

class Direccion {
  @IsString()
  @IsNotEmpty()
  calle: string;

  @IsNumber()
  @Min(1)
  numero: number;

  @IsOptional()
  @IsNumber()
  piso: number;
}

export class CreateUsuarioDto {
  @IsString()
  @MaxLength(18)
  @MinLength(3)
  nombre: string;

  @IsString()
  @MaxLength(18)
  @MinLength(3)
  apellido: string;

  @IsString()
  @MaxLength(30)
  @MinLength(6)
  contraseña: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  roles: string[];

  @Type(() => Direccion)
  @ValidateNested()
  direccion: Direccion;

  @IsEmail()
  @IsNotEmpty()
  mail: string;
}
