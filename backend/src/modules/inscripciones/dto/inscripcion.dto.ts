import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateInscripcionDto {
  @IsNotEmpty({ message: 'El id del socio es obligatorio' })
  @IsInt()
  @IsPositive()
  id_socio!: number;

  @IsNotEmpty({ message: 'El id de la clase es obligatorio' })
  @IsInt()
  @IsPositive()
  id_clase!: number;
}
