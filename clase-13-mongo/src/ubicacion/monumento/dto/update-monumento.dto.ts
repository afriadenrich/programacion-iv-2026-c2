import { PartialType } from '@nestjs/mapped-types';
import { CreateMonumentoDto } from './create-monumento.dto.js';

export class UpdateMonumentoDto extends PartialType(CreateMonumentoDto) {}
