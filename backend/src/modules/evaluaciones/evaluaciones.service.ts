import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluacion } from './entities/evaluacion.entity';
import { Socio } from '../socios/entities/socio.entity';
import { CreateEvaluacionDto, UpdateEvaluacionDto } from './dto/evaluacion.dto';

@Injectable()
export class EvaluacionesService {
  constructor(
    @InjectRepository(Evaluacion)
    private readonly evaluacionRepo: Repository<Evaluacion>,
    @InjectRepository(Socio)
    private readonly socioRepo: Repository<Socio>,
  ) {}

  async create(dto: CreateEvaluacionDto): Promise<Evaluacion> {
    const socio = await this.socioRepo.findOne({ where: { id_socio: dto.id_socio } });
    if (!socio) throw new NotFoundException(`Socio con id ${dto.id_socio} no encontrado`);

    const evaluacion = this.evaluacionRepo.create({
      socio,
      peso: dto.peso,
      grasa: dto.grasa ?? null,
      medidas: dto.medidas ?? null,
      fecha: dto.fecha,
    });
    return this.evaluacionRepo.save(evaluacion);
  }

  findAll(): Promise<Evaluacion[]> {
    return this.evaluacionRepo.find({
      relations: ['socio', 'socio.usuario'],
      order: { fecha: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Evaluacion> {
    const e = await this.evaluacionRepo.findOne({
      where: { id_evaluacion: id },
      relations: ['socio', 'socio.usuario'],
    });
    if (!e) throw new NotFoundException(`Evaluación con id ${id} no encontrada`);
    return e;
  }

  findBySocio(idSocio: number): Promise<Evaluacion[]> {
    return this.evaluacionRepo.find({
      where: { socio: { id_socio: idSocio } },
      order: { fecha: 'DESC' },
    });
  }

  async update(id: number, dto: UpdateEvaluacionDto): Promise<Evaluacion> {
    const e = await this.findOne(id);
    if (dto.peso !== undefined) e.peso = dto.peso;
    if (dto.grasa !== undefined) e.grasa = dto.grasa ?? null;
    if (dto.medidas !== undefined) e.medidas = dto.medidas ?? null;
    if (dto.fecha !== undefined) e.fecha = dto.fecha;
    return this.evaluacionRepo.save(e);
  }

  async remove(id: number): Promise<void> {
    const e = await this.findOne(id);
    await this.evaluacionRepo.remove(e);
  }
}
