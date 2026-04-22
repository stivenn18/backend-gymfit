import {
  Controller, Get, Post, Body, Param,
  Delete, ParseIntPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { AsistenciasService } from './asistencias.service';
import { CreateAsistenciaDto } from './dto/asistencia.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('asistencias')
export class AsistenciasController {
  constructor(private readonly asistenciasService: AsistenciasService) {}

  @Post()
  @Roles('admin', 'recepcionista')
  registrar(@Body() dto: CreateAsistenciaDto) {
    return this.asistenciasService.registrar(dto);
  }

  @Get()
  @Roles('admin', 'recepcionista')
  findAll() {
    return this.asistenciasService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'recepcionista')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.asistenciasService.findOne(id);
  }

  @Get('socio/:idSocio')
  @Roles('admin', 'recepcionista', 'entrenador')
  findBySocio(@Param('idSocio', ParseIntPipe) idSocio: number) {
    return this.asistenciasService.findBySocio(idSocio);
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.asistenciasService.remove(id);
  }
}
