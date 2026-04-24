import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

export interface JwtPayload {
  sub: number;   // id_usuario
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
    
    const secret = config.get<string>('JWT_SECRET') || 'super_secret_key_123';
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret, //  asegúrate de que esta clave sea segura y esté en el .env
    });
  }

  /**
   * Se ejecuta después de verificar la firma del token.
   * El objeto retornado queda en request.user.
   */
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
