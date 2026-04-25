import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertasStockController } from './alertas-stock.controller';
import { AlertasStockService } from './alertas-stock.service';
import { AlertaStock } from './entities/alerta-stock.entity';
import { Equipo } from '../equipos/entities/equipo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlertaStock, Equipo])],
  controllers: [AlertasStockController],
  providers: [AlertasStockService],
  exports: [TypeOrmModule, AlertasStockService],
})
export class AlertasStockModule {}
