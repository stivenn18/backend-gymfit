import {
  Controller, Get, Post, Body, Param,
  Put, Delete, ParseIntPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ProgresoService } from './progreso.service';
import { CreateProgresoDto, UpdateProgresoDto } from './dto/progreso.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('progreso')
export class ProgresoController {
  constructor(private readonly progresoService: ProgresoService) {}

  @Post()
  @Roles('admin', 'entrenador')
  create(@Body() dto: CreateProgresoDto) {
    return this.progresoService.create(dto);
  }

  @Get()
  @Roles('admin', 'entrenador')
  findAll() {
    return this.progresoService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'entrenador')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.progresoService.findOne(id);
  }

  @Get('socio/:idSocio')
  @Roles('admin', 'entrenador', 'recepcionista')
  findBySocio(@Param('idSocio', ParseIntPipe) idSocio: number) {
    return this.progresoService.findBySocio(idSocio);
  }

  @Put(':id')
  @Roles('admin', 'entrenador')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProgresoDto) {
    return this.progresoService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.progresoService.remove(id);
  }
}
