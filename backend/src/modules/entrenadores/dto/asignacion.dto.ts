import { IsInt, IsNotEmpty, IsPositive, IsDateString } from 'class-validator';


export class CreateAsignacionDto {
  @IsNotEmpty({ message: 'El id del entrenador es obligatorio' })
  @IsInt()
  @IsPositive()
  id_entrenador!: number;

  @IsNotEmpty({ message: 'El id del socio es obligatorio' })
  @IsInt()
  @IsPositive()
  id_socio!: number;

  @IsNotEmpty({ message: 'La fecha de asignación es obligatoria' })
  @IsDateString({}, { message: 'La fecha debe tener formato YYYY-MM-DD' })
  fecha_asignacion!: string;
}