import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacionesController } from './notificaciones.controller';
import { NotificacionesService } from './notificaciones.service';
import { Notificacion } from './entities/notificacion.entity';
import { Membresia } from '../membresias/entities/membresia.entity';
import { Equipo } from '../equipos/entities/equipo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notificacion, Membresia, Equipo])],
  controllers: [NotificacionesController],
  providers: [NotificacionesService],
  exports: [TypeOrmModule, NotificacionesService],
})
export class NotificacionesModule {}
