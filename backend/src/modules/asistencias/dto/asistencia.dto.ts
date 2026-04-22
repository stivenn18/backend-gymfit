import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateAsistenciaDto {
  @IsNotEmpty({ message: 'El id del socio es obligatorio' })
  @IsInt()
  @IsPositive()
  id_socio: number;
}
