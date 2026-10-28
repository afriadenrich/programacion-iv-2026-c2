import { PartialType } from '@nestjs/mapped-types';
import { CreateMuebleDto } from './create-mueble.dto.js';

export class UpdateMuebleDto extends PartialType(CreateMuebleDto) {}
