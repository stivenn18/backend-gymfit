import {
  Controller, Get, Post, Body, Param,
  Put, Delete, ParseIntPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ClasesService } from './clases.service';
import { CreateClaseDto } from './dto/clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('clases')
export class ClasesController {
  constructor(private readonly clasesService: ClasesService) {}

  @Post()
  @Roles('admin', 'entrenador')
  create(@Body() dto: CreateClaseDto) {
    return this.clasesService.create(dto);
  }

  @Get()
  findAll() {
    return this.clasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clasesService.findOne(id);
  }

  @Get(':id/cupos')
  getCuposDisponibles(@Param('id', ParseIntPipe) id: number) {
    return this.clasesService.getCuposDisponibles(id);
  }

  @Put(':id')
  @Roles('admin', 'entrenador')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateClaseDto) {
    return this.clasesService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clasesService.remove(id);
  }
}
