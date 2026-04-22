import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { Socio } from '../socios/entities/socio.entity';
import { CreateAsistenciaDto } from './dto/asistencia.dto';

@Injectable()
export class AsistenciasService {
  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciaRepo: Repository<Asistencia>,
    @InjectRepository(Socio)
    private readonly socioRepo: Repository<Socio>,
  ) {}

  async registrar(dto: CreateAsistenciaDto): Promise<Asistencia> {
    const socio = await this.socioRepo.findOne({ where: { id_socio: dto.id_socio } });
    if (!socio) throw new NotFoundException(`Socio con id ${dto.id_socio} no encontrado`);
    const asistencia = this.asistenciaRepo.create({ socio });
    return this.asistenciaRepo.save(asistencia);
  }

  findAll(): Promise<Asistencia[]> {
    return this.asistenciaRepo.find({
      relations: ['socio', 'socio.usuario'],
      order: { fecha: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Asistencia> {
    const a = await this.asistenciaRepo.findOne({
      where: { id_asistencia: id },
      relations: ['socio', 'socio.usuario'],
    });
    if (!a) throw new NotFoundException(`Asistencia con id ${id} no encontrada`);
    return a;
  }

  findBySocio(idSocio: number): Promise<Asistencia[]> {
    return this.asistenciaRepo.find({
      where: { socio: { id_socio: idSocio } },
      order: { fecha: 'DESC' },
    });
  }

  async remove(id: number): Promise<void> {
    const a = await this.findOne(id);
    await this.asistenciaRepo.remove(a);
  }
}
