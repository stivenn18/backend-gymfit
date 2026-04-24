import {
  IsNotEmpty, IsOptional, IsString, IsInt,
  IsPositive, IsDateString, MaxLength, Min,
  ValidateNested, IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';


export class RutinaEjercicioItemDto {
  @IsNotEmpty({ message: 'El id del ejercicio es obligatorio' })
  @IsInt()
  @IsPositive()
  id_ejercicio!: number;

  @IsOptional({ message: 'Las series son opcionales' })
  @IsInt()
  @Min(1)
  series?: number;

  @IsOptional({ message: 'Las repeticiones son opcionales' })
  @IsInt()
  @Min(1)
  repeticiones?: number;

  @IsOptional({ message: 'El descanso es opcional' })
  @IsInt()
  @Min(0)
  descanso?: number;
}