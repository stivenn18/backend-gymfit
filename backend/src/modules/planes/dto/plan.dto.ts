import {
  IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, Min,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreatePlanDto {
  @IsNotEmpty({ message: 'El nombre del plan es obligatorio' })
  @IsString()
  @MaxLength(100)
  nombre!: string;

  @IsNotEmpty({ message: 'El precio es obligatorio' })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsPositive({ message: 'El precio debe ser mayor a 0' })
  precio!: number;

  @IsNotEmpty({ message: 'La duración en días es obligatoria' })
  @IsInt({ message: 'La duración debe ser un número entero' })
  @Min(1, { message: 'La duración debe ser al menos 1 día' })
  duracion_dias!: number;
}

export class UpdatePlanDto extends PartialType(CreatePlanDto) {}