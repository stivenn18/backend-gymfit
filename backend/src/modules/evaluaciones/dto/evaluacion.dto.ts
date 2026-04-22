import {
  IsDateString, IsInt, IsNotEmpty, IsNumber,
  IsOptional, IsPositive, IsString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateEvaluacionDto {
  @IsNotEmpty({ message: 'El id del socio es obligatorio' })
  @IsInt()
  @IsPositive()
  id_socio: number;

  @IsNotEmpty({ message: 'El peso es obligatorio' })
  @IsNumber({}, { message: 'El peso debe ser un número' })
  @IsPositive({ message: 'El peso debe ser mayor a 0' })
  peso: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  grasa?: number;

  @IsOptional()
  @IsString()
  medidas?: string;

  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  @IsDateString({}, { message: 'La fecha debe tener formato YYYY-MM-DD' })
  fecha: string;
}

export class UpdateEvaluacionDto extends PartialType(CreateEvaluacionDto) {}
