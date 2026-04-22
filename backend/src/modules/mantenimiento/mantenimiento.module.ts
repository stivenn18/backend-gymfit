import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MantenimientoController } from './mantenimiento.controller';
import { MantenimientoService } from './mantenimiento.service';
import { Mantenimiento } from './entities/mantenimiento.entity';
import { Equipo } from '../equipos/entities/equipo.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mantenimiento, Equipo, Usuario])],
  controllers: [MantenimientoController],
  providers: [MantenimientoService],
  exports: [TypeOrmModule, MantenimientoService],
})
export class MantenimientoModule {}
