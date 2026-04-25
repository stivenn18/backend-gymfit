import {
  Controller, Get, Post, Body, Param,
  Put, Delete, ParseIntPipe, HttpCode, HttpStatus, Query,
} from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { CreateNotificacionDto, UpdateNotificacionDto, MarcarLeidaDto } from './dto/notificacion.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('notificaciones')
export class NotificacionesController {
  constructor(private readonly notificacionesService: NotificacionesService) {}

  /** POST /notificaciones — Crear notificación manual */
  @Post()
  @Roles('admin')
  create(@Body() dto: CreateNotificacionDto) {
    return this.notificacionesService.create(dto);
  }

  /** GET /notificaciones — Listar todas (filtro por usuario opcional) */
  @Get()
  @Roles('admin', 'recepcionista')
  findAll(@Query('id_usuario', new ParseIntPipe({ optional: true })) id_usuario?: number) {
    return this.notificacionesService.findAll(id_usuario);
  }

  /** GET /notificaciones/estadisticas — Estadísticas generales */
  @Get('estadisticas')
  @Roles('admin')
  estadisticas() {
    return this.notificacionesService.obtenerEstadisticas();
  }

  /** POST /notificaciones/generar-automaticas — Genera todas las notificaciones automáticas */
  @Post('generar-automaticas')
  @Roles('admin', 'recepcionista')
  generarAutomaticas() {
    return this.notificacionesService.generarTodasAutomaticas();
  }

  /** POST /notificaciones/generar/membresias — Solo notificaciones de membresías por vencer */
  @Post('generar/membresias')
  @Roles('admin', 'recepcionista')
  generarMembresias(@Query('dias', new ParseIntPipe({ optional: true })) dias?: number) {
    return this.notificacionesService.generarNotificacionesMembresias(dias ?? 5);
  }

  /** POST /notificaciones/generar/stock-bajo — Solo notificaciones de stock bajo */
  @Post('generar/stock-bajo')
  @Roles('admin', 'recepcionista')
  generarStockBajo() {
    return this.notificacionesService.generarNotificacionesStockBajo();
  }

  /** GET /notificaciones/no-leidas/:id_usuario — Contador de no leídas */
  @Get('no-leidas/:id_usuario')
  @Roles('admin', 'recepcionista', 'entrenador', 'socio')
  contarNoLeidas(@Param('id_usuario', ParseIntPipe) id_usuario: number) {
    return this.notificacionesService.contarNoLeidas(id_usuario);
  }

  /** POST /notificaciones/marcar-leidas/:id_usuario — Marcar como leídas */
  @Post('marcar-leidas/:id_usuario')
  @Roles('admin', 'recepcionista', 'entrenador', 'socio')
  marcarLeidas(
    @Param('id_usuario', ParseIntPipe) id_usuario: number,
    @Body() dto: MarcarLeidaDto,
  ) {
    return this.notificacionesService.marcarLeidas(id_usuario, dto);
  }

  /** GET /notificaciones/:id — Detalle de una notificación */
  @Get(':id')
  @Roles('admin', 'recepcionista')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.notificacionesService.findOne(id);
  }

  /** PUT /notificaciones/:id — Actualizar notificación */
  @Put(':id')
  @Roles('admin')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateNotificacionDto) {
    return this.notificacionesService.update(id, dto);
  }

  /** DELETE /notificaciones/:id — Eliminar notificación */
  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.notificacionesService.remove(id);
  }
}
