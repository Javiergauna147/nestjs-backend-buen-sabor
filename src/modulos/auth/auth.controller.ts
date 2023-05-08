import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateRolDto } from './dto/create-rol.dto';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    createUser(@Body() createUserDto: CreateUserDto){

        createUserDto.rol = createUserDto.rol.toUpperCase();

        return this.authService.create(createUserDto);
    }

    @Post('login')
    loginUser(@Body() loginUserDto: LoginUserDto){
        return this.authService.login(loginUserDto);
    }

    @Post('rol')
    createRol(@Body() createRolDto: CreateRolDto){
        createRolDto.rol = createRolDto.rol.toUpperCase();
        return this.authService.createRol(createRolDto);
    }

    @Get('rol')
    @Auth(...['ADMINISTRADOR'])
    getAllRoles(){
        return this.authService.findAll();
    }

}