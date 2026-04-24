import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AsistenciasService } from './asistencias.service';
import { CreateAsistenciaDto, ValidarAccesoDto } from './dto/asistencia.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';

@Controller('asistencias')
export class AsistenciasController {
  constructor(private readonly asistenciasService: AsistenciasService) {}

  // ══════════════════════════════════════════════════════════════
  // RF-016 — VALIDAR ACCESO AL GIMNASIO
  //
  // POST /api/asistencias/validar-acceso
  // Body: { "identificacion": "1234567890" }
  //
  // → Verifica membresía en tiempo real
  // → Retorna { acceso: true/false, color: "verde"/"rojo", motivo: "..." }
  // → Si acceso=true registra la asistencia automáticamente (RF-017)
  // → Roles: recepcionista y admin. Sin @Public porque siempre
  //   debe haber un operario autenticado en la recepción.
  // ══════════════════════════════════════════════════════════════
  @Post('validar-acceso')
  @Roles('admin', 'recepcionista')
  @HttpCode(HttpStatus.OK)
  validarAcceso(@Body() dto: ValidarAccesoDto) {
    return this.asistenciasService.validarAcceso(dto.identificacion);
  }

  // ══════════════════════════════════════════════════════════════
  // RF-017 — REGISTRAR ASISTENCIA MANUAL (por id_socio)
  // Útil cuando ya se sabe el id del socio directamente
  // ══════════════════════════════════════════════════════════════
  @Post()
  @Roles('admin', 'recepcionista')
  registrar(@Body() dto: CreateAsistenciaDto) {
    return this.asistenciasService.registrar(dto);
  }

  // ══════════════════════════════════════════════════════════════
  // CONSULTAS
  // ══════════════════════════════════════════════════════════════

  @Get()
  @Roles('admin', 'recepcionista')
  findAll() {
    return this.asistenciasService.findAll();
  }

  // Asistencias del día — útil para el panel de recepción
  @Get('hoy')
  @Roles('admin', 'recepcionista')
  findHoy() {
    return this.asistenciasService.findHoy();
  }

  @Get('socio/:idSocio')
  @Roles('admin', 'recepcionista', 'entrenador')
  findBySocio(@Param('idSocio', ParseIntPipe) idSocio: number) {
    return this.asistenciasService.findBySocio(idSocio);
  }

  @Get(':id')
  @Roles('admin', 'recepcionista')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.asistenciasService.findOne(id);
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.asistenciasService.remove(id);
  }
}
