import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateRolDto {
  @IsNotEmpty({ message: 'El nombre del rol es obligatorio' })
  @IsString()
  @MaxLength(50, { message: 'El nombre no puede superar 50 caracteres' })
  nombre!: string;
}

export class UpdateRolDto extends PartialType(CreateRolDto) {}
