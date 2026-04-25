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
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') || 'super-secret-key-12345',
        signOptions: {
          expiresIn: config.get<number>('JWT_EXPIRES_IN', 28800), // "8 horas en segundos"
        },
      }),
    }),
    TypeOrmModule.forFeature([Usuario, Rol]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtModule, PassportModule],
})
export class AuthModule {}