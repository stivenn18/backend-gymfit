import {
  Controller, Get, Post, Body, Param,
  Put, Delete, ParseIntPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { RutinasService } from './rutinas.service';
import { CreateRutinaDto, UpdateRutinaDto } from './dto/rutina.dto';
import { CreateAsignacionRutinaDto } from './dto/asignacion-rutina.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('rutinas')
export class RutinasController {
  constructor(private readonly rutinasService: RutinasService) {}

  @Post()
  @Roles('admin', 'entrenador')
  create(@Body() dto: CreateRutinaDto) {
    return this.rutinasService.create(dto);
  }

  @Get()
  findAll() {
    return this.rutinasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rutinasService.findOne(id);
  }

  @Put(':id')
  @Roles('admin', 'entrenador')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRutinaDto) {
    return this.rutinasService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rutinasService.remove(id);
  }

  //  Asignaciones rutina → socio 
  @Post('asignaciones')
  @Roles('admin', 'entrenador')
  asignarRutina(@Body() dto: CreateAsignacionRutinaDto) {
    return this.rutinasService.asignarRutina(dto);
  }

  @Get('asignaciones/socio/:idSocio')
  @Roles('admin', 'entrenador', 'recepcionista')
  findAsignacionesBySocio(@Param('idSocio', ParseIntPipe) idSocio: number) {
    return this.rutinasService.findAsignacionesBySocio(idSocio);
  }

  @Delete('asignaciones/:id')
  @Roles('admin', 'entrenador')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAsignacion(@Param('id', ParseIntPipe) id: number) {
    return this.rutinasService.removeAsignacion(id);
  }
}
