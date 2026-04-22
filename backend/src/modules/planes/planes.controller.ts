import {
  Controller, Get, Post, Body, Param,
  Put, Delete, ParseIntPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { PlanesService } from './planes.service';
import { CreatePlanDto, UpdatePlanDto } from './dto/plan.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('planes')
export class PlanesController {
  constructor(private readonly planesService: PlanesService) {}

  @Post()
  @Roles('admin')
  create(@Body() dto: CreatePlanDto) {
    return this.planesService.create(dto);
  }

  @Get()
  findAll() {
    return this.planesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.planesService.findOne(id);
  }

  @Put(':id')
  @Roles('admin')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePlanDto) {
    return this.planesService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.planesService.remove(id);
  }
}
