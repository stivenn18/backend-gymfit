import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntrenadoresController } from './entrenadores.controller';
import { EntrenadoresService } from './entrenadores.service';
import { Entrenador } from './entities/entrenador.entity';
import { Asignacion } from './entities/asignacion.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Socio } from '../socios/entities/socio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entrenador, Asignacion, Usuario, Socio])],
  controllers: [EntrenadoresController],
  providers: [EntrenadoresService],
  exports: [TypeOrmModule, EntrenadoresService],
})
export class EntrenadoresModule {}
