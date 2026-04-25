import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

export interface JwtPayload {
  sub: number;
  correo: string;
  rol: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(Usuario)
    private readonly usuariosRepo: Repository<Usuario>,
  ) {
    super({
      // Extrae el token del header: Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Rechaza tokens expirados
      ignoreExpiration: false,
      // Clave secreta desde variables de entorno
      secretOrKey: config.get<string>('JWT_SECRET') || 'super-secret-key-12345',
    });
  }


  async validate(payload: JwtPayload): Promise<Usuario> {
    const usuario = await this.usuariosRepo.findOne({
      where: { id_usuario: payload.sub },
      relations: ['rol'],
    });

    if (!usuario || !usuario.estado) {
      throw new UnauthorizedException('Token inválido o usuario inactivo');
    }

    return usuario;
  }
}
