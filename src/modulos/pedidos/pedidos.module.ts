import { Module } from '@nestjs/common';
import { EstadoPedidoController } from './estado-pedido/estado-pedido.controller';
import { EstadoPedidoService } from './estado-pedido/estado-pedido.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { EstadoPedido, EstadoPedidoSchema } from './estado-pedido/schemas/estado-pedido.schema';
import { PedidoController } from './pedido/pedido.controller';
import { PedidoService } from './pedido/pedido.service';

@Module({
  controllers: [EstadoPedidoController, PedidoController],
  providers: [EstadoPedidoService, PedidoService],
  imports: [
    MongooseModule.forFeature([
      {name: EstadoPedido.name, schema: EstadoPedidoSchema},
    ]),
    AuthModule
  ]
})
export class PedidosModule {}
