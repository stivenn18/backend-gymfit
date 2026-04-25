import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode, HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateEquipoDto, UpdateEquipoDto } from './dto/equipo.dto';
import { EquiposService } from './equipos.service';

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

  @Get('inventario/bajo-stock')
  @Roles('admin', 'recepcionista')
  obtenerEquiposBajoStock() {
    return this.equiposService.obtenerEquiposBajoStock();
  }

  @Get('inventario/total')
  @Roles('admin')
  obtenerInventarioTotal() {
    return this.equiposService.obtenerInventarioTotal();
  }

  @Get('inventario/alertas')
  @Roles('admin', 'recepcionista')
  obtenerEquiposConAlerta() {
    return this.equiposService.obtenerEquiposConAlerta();
  }

  @Post(':id/stock/actualizar')
  @Roles('admin', 'recepcionista')
  actualizarStock(
    @Param('id', ParseIntPipe) id: number,
    @Query('cantidad', ParseIntPipe) cantidad: number,
    @Query('operacion') operacion: 'aumentar' | 'disminuir',
  ) {
    return this.equiposService.actualizarStock(id, cantidad, operacion);
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
