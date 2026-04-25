import {
  Controller, Get, Post, Body, Param,
  Put, Delete, ParseIntPipe, HttpCode, HttpStatus, Query,
} from '@nestjs/common';
import { AlertasStockService } from './alertas-stock.service';
import {
  CreateAlertaStockDto,
  UpdateAlertaStockDto,
  ResolverAlertaStockDto,
} from './dto/alerta-stock.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('alertas-stock')
export class AlertasStockController {
  constructor(private readonly alertasStockService: AlertasStockService) {}

  /** POST /alertas-stock — Crear alerta manualmente */
  @Post()
  @Roles('admin', 'recepcionista')
  create(@Body() dto: CreateAlertaStockDto) {
    return this.alertasStockService.create(dto);
  }

  /** GET /alertas-stock — Listar todas (filtro opcional por estado) */
  @Get()
  @Roles('admin', 'recepcionista')
  findAll(@Query('estado') estado?: string) {
    return this.alertasStockService.findAll(estado);
  }

  /** GET /alertas-stock/activas — Solo alertas activas */
  @Get('activas')
  @Roles('admin', 'recepcionista')
  obtenerActivas() {
    return this.alertasStockService.obtenerAlertasActivas();
  }

  /** GET /alertas-stock/estadisticas — Resumen estadístico */
  @Get('estadisticas')
  @Roles('admin')
  obtenerEstadisticas() {
    return this.alertasStockService.obtenerEstadisticasAlertas();
  }

  /** POST /alertas-stock/generar-automaticas — Generar alertas según stock actual */
  @Post('generar-automaticas')
  @Roles('admin', 'recepcionista')
  generarAutomaticas() {
    return this.alertasStockService.generarAlertasAutomaticas();
  }

  /** GET /alertas-stock/tipo/:tipo — Filtrar por tipo */
  @Get('tipo/:tipo')
  @Roles('admin', 'recepcionista')
  obtenerPorTipo(@Param('tipo') tipo: 'bajo_stock' | 'sobre_stock' | 'agotado') {
    return this.alertasStockService.obtenerAlertasPorTipo(tipo);
  }

  /** GET /alertas-stock/:id — Detalle de una alerta */
  @Get(':id')
  @Roles('admin', 'recepcionista')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.alertasStockService.findOne(id);
  }

  /** PUT /alertas-stock/:id — Actualizar alerta */
  @Put(':id')
  @Roles('admin')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAlertaStockDto,
  ) {
    return this.alertasStockService.update(id, dto);
  }

  /** POST /alertas-stock/:id/resolver — Resolver o ignorar alerta */
  @Post(':id/resolver')
  @Roles('admin', 'recepcionista')
  resolver(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ResolverAlertaStockDto,
  ) {
    return this.alertasStockService.resolverAlerta(id, dto);
  }

  /** DELETE /alertas-stock/:id — Eliminar alerta */
  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.alertasStockService.remove(id);
  }
}
