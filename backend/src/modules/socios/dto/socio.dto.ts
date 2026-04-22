import {
  IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateSocioDto {
  @IsNotEmpty({ message: 'El id del usuario es obligatorio' })
  @IsInt()
  @IsPositive()
  id_usuario: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  id_prospecto?: number;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  direccion?: string;

  @IsOptional()
  @IsString()
  datos_salud?: string;
}

export class UpdateSocioDto extends PartialType(CreateSocioDto) {}
