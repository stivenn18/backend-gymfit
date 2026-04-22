import {
  Controller, Get, Post, Body, Param,
  Put, Delete, ParseIntPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { CreateEquipoDto, UpdateEquipoDto } from './dto/equipo.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('equipos')
export class EquiposController {
  constructor(private readonly equiposService: EquiposService) {}

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateEquipoDto) {
    return this.equiposService.create(dto);
  }

  @Get()
  @Roles('admin', 'recepcionista')
  findAll() {
    return this.equiposService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'recepcionista')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.equiposService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEquipoDto) {
    return this.equiposService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.equiposService.remove(id);
  }
}
