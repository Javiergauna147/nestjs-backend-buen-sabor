import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { GetUser } from 'src/modulos/auth/decorators/get-user.decorator';
import { Auth } from 'src/modulos/auth/decorators/auth.decorator';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UsuarioDocument } from 'src/modulos/auth/schemas/usuario.schema';
import { ProductoManufacturadoService } from '../../productos-manufacturados/producto-manufacturado/producto-manufacturado.service';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { EstadoPedidoService } from '../estado-pedido/estado-pedido.service';
import { PasarelaMercadoPagoService } from '../pasarela.mercadopago';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventsGateway } from 'src/modulos/events/events.wetways';

@Controller('pedido')
export class PedidoController {
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly pedidoService: PedidoService,
    private readonly estadoPedido: EstadoPedidoService,
    private readonly productoManufacturadoService: ProductoManufacturadoService,
    private readonly pasarelaMercadoPago: PasarelaMercadoPagoService,
  ) {}

  @Post('create')
  @Auth()
  async create(
    @Body() createPedidoDto: CreatePedidoDto,
    @GetUser() user: UsuarioDocument,
  ) {
    console.log('createPedido', user);
    console.log(createPedidoDto);

    createPedidoDto.cliente = createPedidoDto.cliente ?? user.id;
    createPedidoDto.precio = 0;
    createPedidoDto.estado =
      createPedidoDto.estado ??
      (await this.estadoPedido.findByName('SOLICITADO')).id ??
      '';

    const productosPromises = createPedidoDto.productos.map(
      async (producto) => {
        const productoEncontrado = await this.productoManufacturadoService.find(
          producto.producto,
        );
        createPedidoDto.precio += productoEncontrado.precio * producto.cantidad;
        console.log(productoEncontrado);
      },
    );

    await Promise.all(productosPromises);

    const pedido = await this.pedidoService.create(createPedidoDto);
    try {
      const passport = await this.pasarelaMercadoPago.crearPasarela(
        { nombre: 'diego', apellido: 'gonzales', email: user.email },
        {
          id: pedido.id,
          nombre: 'comida',
          precio: pedido.precio,
          descripcion: 'comida',
        },
      );
      console.log('pedido:', pedido.productos);
      pedido.adicionales.pago = {
        status: true,
        value: {
          medioSeleccionado: null,
          medios: [
            {
              type: 'mp',
              link: passport.link,
              id: passport.id,
              estadoProceso: '',
            },
            { type: 'enlocal', link: '', id: '', estadoProceso: '' },
          ],
        },
      };
    } catch (e) {
      pedido.adicionales.pago = {
        status: true,
        value: {
          medioSeleccionado: null,
          medios: [{ type: 'enlocal', link: '', id: '', estadoProceso: '' }],
        },
      };
    }
    await pedido.updateOne(pedido);
    return {
      pedido: {
        id: pedido.id,
        estado: (await this.estadoPedido.findById(pedido.estado)).nombre,
        productos: await Promise.all(
          pedido.productos.map(async (producto) => {
            let { nombre, id, precio } =
              await this.productoManufacturadoService.find(producto.producto);
            return {
              cantidad: producto.cantidad,
              producto: nombre,
              precio: precio,
              id: id,
            };
          }),
        ),
        precio: pedido.precio,
        adicionales: pedido.adicionales,
      },

      message: 'Pedido creado con éxito',
    };
  }

  @Get('find-all')
  @Auth()
  async findAll(@GetUser() user: UsuarioDocument) {
    return await Promise.all(
      (
        await this.pedidoService.findAll(user.id)
      ).map(async (pedido) => ({
        id: pedido.id,
        estado: (await this.estadoPedido.findById(pedido.estado)).nombre,
        productos: await Promise.all(
          pedido.productos.map(async (producto) => {
            let { nombre, id, precio } =
              await this.productoManufacturadoService.find(producto.producto);
            return {
              cantidad: producto.cantidad,
              producto: nombre,
              precio: precio,
              id: id,
            };
          }),
        ),
        precio: pedido.precio,
        adicionales: pedido.adicionales,
      })),
    );
  }

  @Put('update')
  @Auth(...['ADMINISTRADOR'])
  async update(@Body() updatePedidoDto: UpdatePedidoDto) {
    let result = await this.pedidoService.updateOne(updatePedidoDto);
    let pedido = await this.pedidoService.findById(updatePedidoDto._id);
    return result;
  }

  @Get('find-all-administrator')
  @Auth('ADMINISTRADOR')
  findAllAdministrator() {
    return this.pedidoService.findAllAdministrator();
  }

  @Delete('delete/:id')
  @Auth('ADMINISTRADOR')
  deleteOneBID(@Param('id') id: string) {
    return this.pedidoService.deletebyId(id);
  }
}
