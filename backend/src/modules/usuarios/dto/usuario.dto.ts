import {
  IsNotEmpty, IsString, IsEmail, IsOptional,
  IsBoolean, IsInt, MaxLength, MinLength,
} from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class CreateUsuarioDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsNotEmpty({ message: 'La identificación es obligatoria' })
  @IsString()
  @MaxLength(50)
  identificacion: string;

  @IsNotEmpty({ message: 'El correo es obligatorio' })
  @IsEmail({}, { message: 'El correo no tiene formato válido' })
  @MaxLength(100)
  correo: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener mínimo 8 caracteres' })
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @IsNotEmpty({ message: 'El id del rol es obligatorio' })
  @IsInt({ message: 'El id_rol debe ser un número entero' })
  id_rol: number;
}

export class UpdateUsuarioDto extends PartialType(
  OmitType(CreateUsuarioDto, ['password'] as const),
) {
  @IsOptional()
  @IsBoolean()
  estado?: boolean;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;
}
