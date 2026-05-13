import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsString, MinLength } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './usuario.dto';

export class UpdateUsuarioDto extends PartialType(
  OmitType(CreateUsuarioDto, ['password'] as const),
) {
  @ApiPropertyOptional({
    example: true,
    description: 'Estado del usuario — false desactiva la cuenta (soft-delete)',
  })
  @IsOptional()
  @IsBoolean()
  estado?: boolean;

  @ApiPropertyOptional({
    example: 'nuevaPassword456',
    description: 'Nueva contraseña (opcional — mínimo 8 caracteres)',
    minLength: 8,
  })
  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;
}
