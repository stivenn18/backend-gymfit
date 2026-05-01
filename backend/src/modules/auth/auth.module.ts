import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './estrategies/jwt.strategy';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Rol } from '../roles/entities/rol.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error(
            'JWT_SECRET no está configurado. Agréguela en el archivo .env',
          );
        }

        const expiresIn = config.get<string>('JWT_EXPIRES_IN', '8h');
        if (!expiresIn) {
          throw new Error('JWT_EXPIRES_IN no está configurado');
        }

        const parsedExpiresIn = parseInt(expiresIn, 10);
        const expiresInValue = Number.isNaN(parsedExpiresIn)
          ? expiresIn
          : parsedExpiresIn;

        return {
          secret,
          signOptions: {
            expiresIn: expiresInValue as any,
          },
        };
      },
    }),
    TypeOrmModule.forFeature([Usuario, Rol]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}
