import {
  Controller, Get, Post, Body, Param,
  Put, Delete, ParseIntPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { EvaluacionesService } from './evaluaciones.service';
import { CreateEvaluacionDto, UpdateEvaluacionDto } from './dto/evaluacion.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('evaluaciones')
export class EvaluacionesController {
  constructor(private readonly evaluacionesService: EvaluacionesService) {}

  @Post()
  @Roles('admin', 'entrenador')
  create(@Body() dto: CreateEvaluacionDto) {
    return this.evaluacionesService.create(dto);
  }

  @Get()
  @Roles('admin', 'entrenador')
  findAll() {
    return this.evaluacionesService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'entrenador')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.evaluacionesService.findOne(id);
  }

  @Get('socio/:idSocio')
  @Roles('admin', 'entrenador', 'recepcionista')
  findBySocio(@Param('idSocio', ParseIntPipe) idSocio: number) {
    return this.evaluacionesService.findBySocio(idSocio);
  }

  @Put(':id')
  @Roles('admin', 'entrenador')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEvaluacionDto) {
    return this.evaluacionesService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.evaluacionesService.remove(id);
  }
}
