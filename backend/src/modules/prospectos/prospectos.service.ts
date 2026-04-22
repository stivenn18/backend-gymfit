import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prospecto } from './entities/prospecto.entity';
import { CreateProspectoDto, UpdateProspectoDto } from './dto/prospecto.dto';

@Injectable()
export class ProspectosService {
  constructor(
    @InjectRepository(Prospecto)
    private readonly prospectoRepo: Repository<Prospecto>,
  ) {}

  create(dto: CreateProspectoDto): Promise<Prospecto> {
    const prospecto = this.prospectoRepo.create({
      nombre:   dto.nombre,
      telefono: dto.telefono ?? null,
      interes:  dto.interes  ?? null,
      origen:   dto.origen   ?? null,
    });
    return this.prospectoRepo.save(prospecto);
  }

  findAll(): Promise<Prospecto[]> {
    return this.prospectoRepo.find({
      order: { fecha_registro: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Prospecto> {
    const p = await this.prospectoRepo.findOne({
      where: { id_prospecto: id },
    });
    if (!p) throw new NotFoundException(`Prospecto con id ${id} no encontrado`);
    return p;
  }

  async update(id: number, dto: UpdateProspectoDto): Promise<Prospecto> {
    const p = await this.findOne(id);
    if (dto.nombre   !== undefined) p.nombre   = dto.nombre;
    if (dto.telefono !== undefined) p.telefono = dto.telefono ?? null;
    if (dto.interes  !== undefined) p.interes  = dto.interes  ?? null;
    if (dto.origen   !== undefined) p.origen   = dto.origen   ?? null;
    return this.prospectoRepo.save(p);
  }

  async remove(id: number): Promise<void> {
    const p = await this.findOne(id);
    await this.prospectoRepo.remove(p);
  }
}
