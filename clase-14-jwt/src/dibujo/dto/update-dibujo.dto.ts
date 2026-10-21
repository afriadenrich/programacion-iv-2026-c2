import { PartialType } from '@nestjs/mapped-types';
import { CreateDibujoDto } from './create-dibujo.dto.js';

export class UpdateDibujoDto extends PartialType(CreateDibujoDto) {}
