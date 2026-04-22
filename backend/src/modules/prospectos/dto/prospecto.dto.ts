import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProspectoDto {
  @IsNotEmpty({ message: 'El nombre del prospecto es obligatorio' })
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  interes?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  origen?: string;
}

export class UpdateProspectoDto extends PartialType(CreateProspectoDto) {}
