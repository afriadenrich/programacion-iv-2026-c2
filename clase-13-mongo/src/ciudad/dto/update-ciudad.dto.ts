import { PartialType } from '@nestjs/mapped-types';
import { CreateCiudadDto } from './create-ciudad.dto.js';

export class UpdateCiudadDto extends PartialType(CreateCiudadDto) {}
