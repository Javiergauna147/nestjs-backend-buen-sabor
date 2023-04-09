import { Body, Controller, Get, Post } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { GetUser } from 'src/modulos/auth/decorators/get-user.decorator';
import { Auth } from 'src/modulos/auth/decorators/auth.decorator';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UsuarioDocument } from 'src/modulos/auth/schemas/usuario.schema';

@Controller('pedido')
export class PedidoController {
    constructor( private readonly pedidoService: PedidoService ) {}

    @Post('create')
    @Auth()
    create( @Body() createPedidoDto: CreatePedidoDto, @GetUser() user: UsuarioDocument ){
        createPedidoDto.cliente = user.id;
        return this.pedidoService.create(createPedidoDto);
    }

    @Get('find-all')
    @Auth()
    findAll( @GetUser() user: UsuarioDocument ){
        return this.pedidoService.findAll(user.id);
    }
}
