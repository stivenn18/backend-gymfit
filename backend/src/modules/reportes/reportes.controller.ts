import { Controller, Get, Query } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  /**
   * GET /reportes/general
   * Dashboard general del gimnasio: socios, membresías, asistencias, ingresos, alertas.
   */
  @Get('general')
  @Roles('admin')
  reporteGeneral() {
    return this.reportesService.reporteGeneral();
  }

  /**
   * GET /reportes/membresias?desde=YYYY-MM-DD&hasta=YYYY-MM-DD
   * Reporte de membresías con ingresos estimados, agrupación por plan y estado.
   */
  @Get('membresias')
  @Roles('admin')
  reporteMembresias(
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
  ) {
    return this.reportesService.reporteMembresias(desde, hasta);
  }

  /**
   * GET /reportes/asistencias?desde=YYYY-MM-DD&hasta=YYYY-MM-DD
   * Reporte de asistencias con distribución por día y top socios.
   */
  @Get('asistencias')
  @Roles('admin', 'recepcionista')
  reporteAsistencias(
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
  ) {
    return this.reportesService.reporteAsistencias(desde, hasta);
  }

  /**
   * GET /reportes/inventario
   * Reporte completo del inventario de equipos con estado de stock y valor total.
   */
  @Get('inventario')
  @Roles('admin')
  reporteInventario() {
    return this.reportesService.reporteInventario();
  }
}
