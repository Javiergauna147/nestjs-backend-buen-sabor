import { Body, Controller, Post } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { GetUser } from 'src/modulos/auth/decorators/get-user.decorator';
import { Auth } from 'src/modulos/auth/decorators/auth.decorator';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { Usuario, UsuarioDocument } from 'src/modulos/auth/schemas/usuario.schema';

@Controller('pedido')
export class PedidoController {
    constructor( private readonly pedidoService: PedidoService ) {}

    @Post('create')
    @Auth()
    create( @Body() createPedidoDto: CreatePedidoDto, @GetUser() user: UsuarioDocument ){
        createPedidoDto.cliente = user.id;
        console.log(createPedidoDto)
    }
}
