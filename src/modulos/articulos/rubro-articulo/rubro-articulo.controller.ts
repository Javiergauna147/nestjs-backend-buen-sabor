import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/modulos/auth/decorators/auth.decorator';
import { GetUser } from 'src/modulos/auth/decorators/get-user.decorator';
import { Usuario } from 'src/modulos/auth/schemas/usuario.schema';
import { CreateRubroArticuloDto } from './dto/create-rubro-articulo.dto';
import { RubroArticuloService } from './rubro-articulo.service';

@Controller('rubro-articulo')
export class RubroArticuloController {
    constructor( private readonly rubroArticuloService: RubroArticuloService ) {}

    @Post('create')
    @Auth()
    create( @Body() createRubroArticuloDto: CreateRubroArticuloDto ){
        return this.rubroArticuloService.create(createRubroArticuloDto);
    }

}
