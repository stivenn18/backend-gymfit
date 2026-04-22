import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProspectosController } from './prospectos.controller';
import { ProspectosService } from './prospectos.service';
import { Prospecto } from './entities/prospecto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prospecto])],
  controllers: [ProspectosController],
  providers: [ProspectosService],
  exports: [TypeOrmModule, ProspectosService],
})
export class ProspectosModule {}
