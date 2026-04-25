import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsuarioActual } from '../../common/decorators/usuario-actual.decorator';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Public } from '../../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /api/auth/register
   * Ruta pública — registra un nuevo usuario con validaciones completas.
   * HU-01 / RF-001: nombre, identificación, correo, rol obligatorios.
   */
  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  /**
   * POST /api/auth/login
   * Ruta pública — autentica y retorna JWT.
   * HU-02: valida correo + contraseña.
   */
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  /**
   * GET /api/auth/perfil
   * Ruta protegida — requiere Bearer token válido.
   * HU-03: retorna los datos del usuario autenticado.
   */
  @Get('perfil')
  perfil(@UsuarioActual() usuario: Usuario) {
    return this.authService.perfil(usuario.id_usuario);
  }
}
