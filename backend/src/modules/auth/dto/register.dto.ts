import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  @MaxLength(100)
  nombre!: string;

  @IsNotEmpty({ message: 'La identificación es obligatoria' })
  @IsString()
  @MaxLength(50)
  identificacion!: string;

  @IsNotEmpty({ message: 'El correo es obligatorio' })
  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  @MaxLength(100)
  correo!: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener mínimo 8 caracteres' })
  password!: string;

  @IsOptional({ message: 'El teléfono es opcional' })
  @IsString()
  @MaxLength(20)
  telefono?: string;

  @IsNotEmpty({ message: 'El id del rol es obligatorio' })
  @IsInt({ message: 'El id_rol debe ser un número entero' })
  @IsPositive()
  id_rol!: number;
}
