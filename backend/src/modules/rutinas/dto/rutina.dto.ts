import {
  IsNotEmpty, IsOptional, IsString, IsInt,
  IsPositive, IsDateString, MaxLength, Min,
  ValidateNested, IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

// ── Ejercicio dentro de una rutina ────────────────────────────
export class RutinaEjercicioItemDto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id_ejercicio: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  series?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  repeticiones?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  descanso?: number;
}

// ── Crear rutina ──────────────────────────────────────────────
export class CreateRutinaDto {
  @IsNotEmpty({ message: 'El nombre de la rutina es obligatorio' })
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  nivel?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RutinaEjercicioItemDto)
  ejercicios?: RutinaEjercicioItemDto[];
}

export class UpdateRutinaDto extends PartialType(CreateRutinaDto) {}

// ── Asignar rutina a socio ────────────────────────────────────
export class CreateAsignacionRutinaDto {
  @IsNotEmpty({ message: 'El id de la rutina es obligatorio' })
  @IsInt()
  @IsPositive()
  id_rutina: number;

  @IsNotEmpty({ message: 'El id del socio es obligatorio' })
  @IsInt()
  @IsPositive()
  id_socio: number;

  @IsNotEmpty({ message: 'La fecha de asignación es obligatoria' })
  @IsDateString({}, { message: 'La fecha debe tener formato YYYY-MM-DD' })
  fecha_asignacion: string;
}
