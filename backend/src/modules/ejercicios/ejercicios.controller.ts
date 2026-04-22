import {
  Controller, Get, Post, Body, Param,
  Put, Delete, ParseIntPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { EjerciciosService } from './ejercicios.service';
import { CreateEjercicioDto, UpdateEjercicioDto } from './dto/ejercicio.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('ejercicios')
export class EjerciciosController {
  constructor(private readonly ejerciciosService: EjerciciosService) {}

  @Post()
  @Roles('admin', 'entrenador')
  create(@Body() dto: CreateEjercicioDto) {
    return this.ejerciciosService.create(dto);
  }

  @Get()
  findAll() {
    return this.ejerciciosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ejerciciosService.findOne(id);
  }

  @Put(':id')
  @Roles('admin', 'entrenador')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEjercicioDto) {
    return this.ejerciciosService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ejerciciosService.remove(id);
  }
}
