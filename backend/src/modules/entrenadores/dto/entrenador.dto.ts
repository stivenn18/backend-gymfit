import {
  IsInt, IsNotEmpty, IsOptional, IsString,
  MaxLength, Min, IsPositive, IsDateString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateEntrenadorDto {
  @IsNotEmpty({ message: 'El id del usuario es obligatorio' })
  @IsInt()
  @IsPositive()
  id_usuario: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  especialidad?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  experiencia?: number;
}

export class UpdateEntrenadorDto extends PartialType(CreateEntrenadorDto) {}

export class CreateAsignacionDto {
  @IsNotEmpty({ message: 'El id del entrenador es obligatorio' })
  @IsInt()
  @IsPositive()
  id_entrenador: number;

  @IsNotEmpty({ message: 'El id del socio es obligatorio' })
  @IsInt()
  @IsPositive()
  id_socio: number;

  @IsNotEmpty({ message: 'La fecha de asignación es obligatoria' })
  @IsDateString({}, { message: 'La fecha debe tener formato YYYY-MM-DD' })
  fecha_asignacion: string;
}
