import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembresiasController } from './membresias.controller';
import { MembresiasService } from './membresias.service';
import { Membresia } from './entities/membresia.entity';
import { Socio } from '../socios/entities/socio.entity';
import { Plan } from '../planes/entities/plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Membresia, Socio, Plan])],
  controllers: [MembresiasController],
  providers: [MembresiasService],
  exports: [TypeOrmModule, MembresiasService],
})
export class MembresiasModule {}
