import { Body, Controller, Get, Post } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { GetUser } from 'src/modulos/auth/decorators/get-user.decorator';
import { Auth } from 'src/modulos/auth/decorators/auth.decorator';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UsuarioDocument } from 'src/modulos/auth/schemas/usuario.schema';
import { ProductoManufacturadoService } from '../../productos-manufacturados/producto-manufacturado/producto-manufacturado.service';

@Controller('pedido')
export class PedidoController {
    constructor( private readonly pedidoService: PedidoService, private readonly productoManufacturadoService: ProductoManufacturadoService ) {}

    @Post('create')
    @Auth()
    async create( @Body() createPedidoDto: CreatePedidoDto, @GetUser() user: UsuarioDocument ){
        createPedidoDto.cliente = user.id;
        createPedidoDto.precio = 0;

        const productosPromises = createPedidoDto.productos.map(async (producto) => {
            const productoEncontrado = await this.productoManufacturadoService.find(producto.producto);
            createPedidoDto.precio += productoEncontrado.precio * producto.cantidad;
            console.log(productoEncontrado)
          });

        await Promise.all(productosPromises);
        
        return this.pedidoService.create(createPedidoDto);
    }

    @Get('find-all')
    @Auth()
    findAll( @GetUser() user: UsuarioDocument ){
        return this.pedidoService.findAll(user.id);
    }


    @Get('find-all-administrator')
    @Auth('ADMINISTRADOR')
    findAllAdministrator(){
        return this.pedidoService.findAllAdministrator();
    }
}
