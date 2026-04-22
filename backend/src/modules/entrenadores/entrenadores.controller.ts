import {
  Controller, Get, Post, Body, Param,
  Put, Delete, ParseIntPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { EntrenadoresService } from './entrenadores.service';
import { CreateEntrenadorDto, UpdateEntrenadorDto, CreateAsignacionDto } from './dto/entrenador.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('entrenadores')
export class EntrenadoresController {
  constructor(private readonly entrenadoresService: EntrenadoresService) {}

  @Post()
  @Roles('admin')
  create(@Body() dto: CreateEntrenadorDto) {
    return this.entrenadoresService.create(dto);
  }

  @Get()
  @Roles('admin', 'recepcionista')
  findAll() {
    return this.entrenadoresService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'recepcionista', 'entrenador')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.entrenadoresService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEntrenadorDto) {
    return this.entrenadoresService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.entrenadoresService.remove(id);
  }

  // ── Asignaciones entrenador ↔ socio ───────────────────────
  @Post('asignaciones')
  @Roles('admin', 'entrenador')
  asignar(@Body() dto: CreateAsignacionDto) {
    return this.entrenadoresService.asignar(dto);
  }

  @Get(':id/asignaciones')
  @Roles('admin', 'entrenador')
  asignacionesByEntrenador(@Param('id', ParseIntPipe) id: number) {
    return this.entrenadoresService.findAsignacionesByEntrenador(id);
  }

  @Delete('asignaciones/:id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAsignacion(@Param('id', ParseIntPipe) id: number) {
    return this.entrenadoresService.removeAsignacion(id);
  }
}
