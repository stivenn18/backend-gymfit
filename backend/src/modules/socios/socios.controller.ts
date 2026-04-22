import {
  Controller, Get, Post, Body, Param,
  Put, Delete, ParseIntPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { SociosService } from './socios.service';
import { CreateSocioDto, UpdateSocioDto } from './dto/socio.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('socios')
export class SociosController {
  constructor(private readonly sociosService: SociosService) {}

  /** POST /api/socios */
  @Post()
  @Roles('admin', 'recepcionista')
  create(@Body() dto: CreateSocioDto) {
    return this.sociosService.create(dto);
  }

  /** GET /api/socios */
  @Get()
  @Roles('admin', 'recepcionista', 'entrenador')
  findAll() {
    return this.sociosService.findAll();
  }

  /** GET /api/socios/:id */
  @Get(':id')
  @Roles('admin', 'recepcionista', 'entrenador')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sociosService.findOne(id);
  }

  /** PUT /api/socios/:id */
  @Put(':id')
  @Roles('admin', 'recepcionista')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSocioDto) {
    return this.sociosService.update(id, dto);
  }

  /** DELETE /api/socios/:id */
  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sociosService.remove(id);
  }
}
