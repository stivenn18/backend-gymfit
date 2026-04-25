import { IsOptional, IsBoolean, IsString, MinLength } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './usuario.dto';

export class UpdateUsuarioDto extends PartialType(
  OmitType(CreateUsuarioDto, ['password'] as const),
) {
  // Permite activar o desactivar el usuario
  @IsOptional()
  @IsBoolean({ message: 'El estado debe ser verdadero o falso' })
  estado?: boolean;

  // Cambio de contraseña opcional — si se envía debe cumplir el mínimo
  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'La nueva contraseña debe tener mínimo 8 caracteres' })
  password?: string;
}
