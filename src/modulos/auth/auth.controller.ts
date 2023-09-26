import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateRolDto } from './dto/create-rol.dto';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { UsuarioDocument } from './schemas/usuario.schema';
import { CreateUserAdmDto } from './dto/create-user-adm.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('rol')
  createRol(@Body() createRolDto: CreateRolDto) {
    createRolDto.rol = createRolDto.rol.toUpperCase();
    return this.authService.createRol(createRolDto);
  }

  @Get('rol')
  @Auth(...['ADMINISTRADOR'])
  getAllRoles() {
    return this.authService.findAllRoles();
  }

  @Post('create-user')
  @Auth(...['ADMINISTRADOR'])
  createUserAdm(@Body() createUserAdmDto: CreateUserAdmDto) {
    if (createUserAdmDto.rol) {
      createUserAdmDto.rol = createUserAdmDto.rol.toUpperCase();
    }
    return this.authService.create(createUserAdmDto);
  }

  @Get('users')
  @Auth(...['ADMINISTRADOR'])
  getAllUser() {
    return this.authService.findAllUsers();
  }

  @Get('home-menu')
  @Auth(...['ADMINISTRADOR', 'COCINERO', 'CAJERO'])
  getUserHomeMenu(@GetUser() user: UsuarioDocument) {
    const menuPedidos: object = {
      titulo: 'Pedidos',
      descripcion:
        'Gestión de todo lo referente a pedidos, incluyendo eliminar, dar de baja, ver estados, crear estados, etc.',
      redirecto: 'menu-pedidos',
    };

    const menuInsumos: object = {
      titulo: 'Insumos',
      descripcion:
        'Gestión de todo lo referente a insumos, permitiendo crear nuevos, ver stock, modificar stock, etc.',
      redirecto: 'menu-insumos',
    };
    const menuProductos: object = {
      titulo: 'Productos',
      descripcion:
        'Crear, eliminar, gestionar los distintos productos del menú que puede comprar el cliente.',
      redirecto: 'menu-productos',
    };
    const menuUsuarios: object = {
      titulo: 'Gestión Usuarios',
      descripcion:
        'Crear usuarios, cambiar roles a usuarios, eliminar usuarios.',
      redirecto: 'menu-usuarios',
    };
    return {
      administrador: [menuPedidos, menuInsumos, menuProductos, menuUsuarios],
      cocinero: [menuPedidos],
      cajero: [menuPedidos],
    }[user.rol.toLowerCase()];
  }
}
