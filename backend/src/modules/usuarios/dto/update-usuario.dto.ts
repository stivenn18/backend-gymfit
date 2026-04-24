import {
  IsNotEmpty, IsString, IsEmail, IsOptional,
  IsBoolean, IsInt, MaxLength, MinLength,
} from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './usuario.dto';

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
