import {
  Controller, Get, Post, Body, Param,
  Put, Delete, ParseIntPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { MantenimientoService } from './mantenimiento.service';
import { CreateMantenimientoDto, UpdateMantenimientoDto } from './dto/mantenimiento.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('mantenimiento')
export class MantenimientoController {
  constructor(private readonly mantenimientoService: MantenimientoService) {}

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateMantenimientoDto) {
    return this.mantenimientoService.create(dto);
  }

  @Get()
  @Roles('admin', 'recepcionista')
  findAll() {
    return this.mantenimientoService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'recepcionista')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mantenimientoService.findOne(id);
  }

  @Get('equipo/:idEquipo')
  @Roles('admin', 'recepcionista')
  findByEquipo(@Param('idEquipo', ParseIntPipe) idEquipo: number) {
    return this.mantenimientoService.findByEquipo(idEquipo);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMantenimientoDto) {
    return this.mantenimientoService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.mantenimientoService.remove(id);
  }
}
