import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProspectosService } from './prospectos.service';
import { CreateProspectoDto, UpdateProspectoDto } from './dto/prospecto.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('prospectos')
export class ProspectosController {
  constructor(private readonly prospectosService: ProspectosService) {}

  /** POST /api/prospectos */
  @Post()
  @Roles('admin', 'recepcionista')
  create(@Body() dto: CreateProspectoDto) {
    return this.prospectosService.create(dto);
  }

  /** GET /api/prospectos */
  @Get()
  @Roles('admin', 'recepcionista')
  findAll() {
    return this.prospectosService.findAll();
  }

  /** GET /api/prospectos/:id */
  @Get(':id')
  @Roles('admin', 'recepcionista')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prospectosService.findOne(id);
  }

  /** PUT /api/prospectos/:id */
  @Put(':id')
  @Roles('admin', 'recepcionista')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProspectoDto,
  ) {
    return this.prospectosService.update(id, dto);
  }

  /** DELETE /api/prospectos/:id */
  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.prospectosService.remove(id);
  }
}
