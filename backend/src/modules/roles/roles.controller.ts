import {
  Controller, Get, Post, Body, Param, Put, Delete,
  ParseIntPipe, HttpCode, HttpStatus,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolDto, UpdateRolDto } from './dto/rol.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('roles')
@Roles('admin')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() dto: CreateRolDto) {
    return this.rolesService.create(dto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRolDto) {
    return this.rolesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.remove(id);
  }
}
