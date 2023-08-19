import { Body, Controller, Get, Post } from '@nestjs/common';
import { EstadoPedidoService } from './estado-pedido.service';
import { Auth } from 'src/modulos/auth/decorators/auth.decorator';
import { CreateEstadoPedidoDto } from './dto/create-estado-pedido.dto';

@Controller('estado-pedido')
export class EstadoPedidoController {
  constructor(private readonly estadoPedidoService: EstadoPedidoService) {}

  @Post('create')
  @Auth()
  create(@Body() CreateEstadoPedidoDto: CreateEstadoPedidoDto) {
    return this.estadoPedidoService.create(CreateEstadoPedidoDto);
  }

  @Get('find-all')
  @Auth()
  findAll() {
    return this.estadoPedidoService.findAll();
  }
}
