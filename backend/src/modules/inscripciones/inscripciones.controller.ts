import {
  Controller, Get, Post, Body, Param,
  Delete, ParseIntPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { CreateInscripcionDto } from './dto/inscripcion.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('inscripciones')
export class InscripcionesController {
  constructor(private readonly inscripcionesService: InscripcionesService) {}

  @Post()
  @Roles('admin', 'recepcionista')
  create(@Body() dto: CreateInscripcionDto) {
    return this.inscripcionesService.create(dto);
  }

  @Get()
  @Roles('admin', 'recepcionista')
  findAll() {
    return this.inscripcionesService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'recepcionista', 'entrenador')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inscripcionesService.findOne(id);
  }

  @Get('socio/:idSocio')
  @Roles('admin', 'recepcionista', 'entrenador')
  findBySocio(@Param('idSocio', ParseIntPipe) idSocio: number) {
    return this.inscripcionesService.findBySocio(idSocio);
  }

  @Get('clase/:idClase')
  @Roles('admin', 'recepcionista', 'entrenador')
  findByClase(@Param('idClase', ParseIntPipe) idClase: number) {
    return this.inscripcionesService.findByClase(idClase);
  }

  @Delete(':id')
  @Roles('admin', 'recepcionista')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inscripcionesService.remove(id);
  }
}
