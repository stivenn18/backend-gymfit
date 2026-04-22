import {
  IsNotEmpty, IsOptional, IsString, MaxLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateEquipoDto {
  @IsNotEmpty({ message: 'El nombre del equipo es obligatorio' })
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  tipo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  estado?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  ubicacion?: string;
}

export class UpdateEquipoDto extends PartialType(CreateEquipoDto) {}
