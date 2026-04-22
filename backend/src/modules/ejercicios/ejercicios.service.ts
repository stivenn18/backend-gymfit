import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ejercicio } from './entities/ejercicio.entity';
import { CreateEjercicioDto, UpdateEjercicioDto } from './dto/ejercicio.dto';

@Injectable()
export class EjerciciosService {
  constructor(
    @InjectRepository(Ejercicio)
    private readonly ejercicioRepo: Repository<Ejercicio>,
  ) {}

  create(dto: CreateEjercicioDto): Promise<Ejercicio> {
    return this.ejercicioRepo.save(this.ejercicioRepo.create(dto));
  }

  findAll(): Promise<Ejercicio[]> {
    return this.ejercicioRepo.find({ order: { id_ejercicio: 'ASC' } });
  }

  async findOne(id: number): Promise<Ejercicio> {
    const e = await this.ejercicioRepo.findOne({ where: { id_ejercicio: id } });
    if (!e) throw new NotFoundException(`Ejercicio con id ${id} no encontrado`);
    return e;
  }

  async update(id: number, dto: UpdateEjercicioDto): Promise<Ejercicio> {
    const e = await this.findOne(id);
    Object.assign(e, dto);
    return this.ejercicioRepo.save(e);
  }

  async remove(id: number): Promise<void> {
    const e = await this.findOne(id);
    await this.ejercicioRepo.remove(e);
  }
}
