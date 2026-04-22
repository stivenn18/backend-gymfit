import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InscripcionesController } from './inscripciones.controller';
import { InscripcionesService } from './inscripciones.service';
import { Inscripcion } from './entities/inscripcion.entity';
import { Socio } from '../socios/entities/socio.entity';
import { Clase } from '../clases/entities/clase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inscripcion, Socio, Clase])],
  controllers: [InscripcionesController],
  providers: [InscripcionesService],
  exports: [TypeOrmModule, InscripcionesService],
})
export class InscripcionesModule {}
