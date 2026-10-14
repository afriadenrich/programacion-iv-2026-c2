import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto.js';

// 1. Hereda toda la clase
// export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}

// 2. Hereda solamente los atributos seleccionados
// export class UpdateUsuarioDto extends PickType(CreateUsuarioDto, [
//   'nombre',
//   'apellido',
// ] as const) {}

// 3. Heredar lo que no fue omitido
export class UpdateUsuarioDto extends OmitType(CreateUsuarioDto, [
  'mail',
  'contraseña',
] as const) {}
