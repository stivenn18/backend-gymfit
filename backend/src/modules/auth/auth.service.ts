import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './estrategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepo: Repository<Usuario>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  // ─── Login ────────────────────────────────────────────────────
  async login(dto: LoginDto) {
    // 1. Buscar usuario por correo con su rol
    const usuario = await this.usuariosRepo.findOne({
      where: { correo: dto.correo },
      relations: ['rol'],
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    if (!usuario.estado) {
      throw new UnauthorizedException('El usuario está inactivo');
    }

    // 2. Verificar contraseña con bcrypt
    const passwordValida = await bcrypt.compare(dto.password, usuario.password);
    if (!passwordValida) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // 3. Construir payload y firmar token
    const payload: JwtPayload = {
      sub:    usuario.id_usuario,
      correo: usuario.correo,
      rol:    usuario.rol.nombre,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre:     usuario.nombre,
        correo:     usuario.correo,
        rol:        usuario.rol.nombre,
      },
    };
  }

  // ─── Perfil del usuario autenticado ──────────────────────────
  async perfil(id: number): Promise<Omit<Usuario, 'password'>> {
    const usuario = await this.usuariosRepo.findOne({
      where: { id_usuario: id },
      relations: ['rol'],
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const { password, ...resultado } = usuario;
    return resultado as Omit<Usuario, 'password'>;
  }
}
