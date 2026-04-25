import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Rol } from '../roles/entities/rol.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './estrategies/jwt.strategy';

@Injectable()
export class AuthService {
  // parseInt() garantiza que siempre sea número entero,
  // sin importar cómo ConfigService devuelva el valor del .env
  private readonly saltRounds: number;

  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepo: Repository<Usuario>,
    @InjectRepository(Rol)
    private readonly rolRepo: Repository<Rol>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {
    const raw = this.config.get<string>('BCRYPT_SALT_ROUNDS', '10');
    this.saltRounds = parseInt(raw, 10) || 10;
  }

  // ─── Register (HU-01 / RF-001) ────────────────────────────────
  async register(dto: RegisterDto) {
    // 1. Verificar correo único
    const correoExiste = await this.usuariosRepo.findOne({
      where: { correo: dto.correo },
    });
    if (correoExiste) {
      throw new ConflictException('El correo ya está registrado');
    }

    // 2. Verificar identificación única
    const idExiste = await this.usuariosRepo.findOne({
      where: { identificacion: dto.identificacion },
    });
    if (idExiste) {
      throw new ConflictException('La identificación ya está registrada');
    }

    // 3. Verificar que el rol existe
    const rol = await this.rolRepo.findOne({ where: { id_rol: dto.id_rol } });
    if (!rol) {
      throw new NotFoundException(`Rol con id ${dto.id_rol} no encontrado`);
    }

    // 4. Hashear contraseña — saltRounds es número entero garantizado
    const hash = await bcrypt.hash(dto.password, this.saltRounds);

    // 5. Crear y guardar usuario
    const usuario = this.usuariosRepo.create({
      nombre:         dto.nombre,
      identificacion: dto.identificacion,
      correo:         dto.correo,
      password:       hash,
      telefono:       dto.telefono ?? null,
      rol,
      estado:         true,
    });
    const guardado = await this.usuariosRepo.save(usuario);

    // 6. Generar token y retornar (mismo formato que login)
    const payload: JwtPayload = {
      sub:    guardado.id_usuario,
      correo: guardado.correo,
      rol:    rol.nombre,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id_usuario: guardado.id_usuario,
        nombre:     guardado.nombre,
        correo:     guardado.correo,
        rol:        rol.nombre,
      },
    };
  }

  // ─── Login (HU-02) ────────────────────────────────────────────
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
