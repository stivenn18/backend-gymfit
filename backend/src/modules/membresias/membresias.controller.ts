import {
  Controller, Get, Post, Body, Param,
  Put, Delete, ParseIntPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { MembresiasService } from './membresias.service';
import { CreateMembresiaDto, UpdateMembresiaDto } from './dto/membresia.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('membresias')
export class MembresiasController {
  constructor(private readonly membresiasService: MembresiasService) {}

  @Post()
  @Roles('admin', 'recepcionista')
  create(@Body() dto: CreateMembresiaDto) {
    return this.membresiasService.create(dto);
  }

  @Get()
  @Roles('admin', 'recepcionista')
  findAll() {
    return this.membresiasService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'recepcionista')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.membresiasService.findOne(id);
  }

  @Get('socio/:idSocio')
  @Roles('admin', 'recepcionista', 'entrenador')
  findBySocio(@Param('idSocio', ParseIntPipe) idSocio: number) {
    return this.membresiasService.findBySocio(idSocio);
  }

  @Put(':id')
  @Roles('admin', 'recepcionista')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMembresiaDto) {
    return this.membresiasService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.membresiasService.remove(id);
  }
}
