import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClasesController } from './clases.controller';
import { ClasesService } from './clases.service';
import { Clase } from './entities/clase.entity';
import { Entrenador } from '../entrenadores/entities/entrenador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clase, Entrenador])],
  controllers: [ClasesController],
  providers: [ClasesService],
  exports: [TypeOrmModule, ClasesService],
})
export class ClasesModule {}
