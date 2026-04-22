import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo } from './entities/equipo.entity';
import { CreateEquipoDto, UpdateEquipoDto } from './dto/equipo.dto';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo)
    private readonly equipoRepo: Repository<Equipo>,
  ) {}

  create(dto: CreateEquipoDto): Promise<Equipo> {
    const equipo = this.equipoRepo.create({
      nombre: dto.nombre,
      tipo: dto.tipo ?? null,
      estado: dto.estado ?? 'disponible',
      ubicacion: dto.ubicacion ?? null,
    });
    return this.equipoRepo.save(equipo);
  }

  findAll(): Promise<Equipo[]> {
    return this.equipoRepo.find({
      relations: ['mantenimientos'],
      order: { id_equipo: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Equipo> {
    const e = await this.equipoRepo.findOne({
      where: { id_equipo: id },
      relations: ['mantenimientos', 'mantenimientos.usuario'],
    });
    if (!e) throw new NotFoundException(`Equipo con id ${id} no encontrado`);
    return e;
  }

  async update(id: number, dto: UpdateEquipoDto): Promise<Equipo> {
    const e = await this.findOne(id);
    Object.assign(e, dto);
    return this.equipoRepo.save(e);
  }

  async remove(id: number): Promise<void> {
    const e = await this.findOne(id);
    await this.equipoRepo.remove(e);
  }
}
