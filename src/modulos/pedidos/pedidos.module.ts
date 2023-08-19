import { Module } from '@nestjs/common';
import { EstadoPedidoController } from './estado-pedido/estado-pedido.controller';
import { EstadoPedidoService } from './estado-pedido/estado-pedido.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import {
  EstadoPedido,
  EstadoPedidoSchema,
} from './estado-pedido/schemas/estado-pedido.schema';
import { PedidoController } from './pedido/pedido.controller';
import { PedidoService } from './pedido/pedido.service';
import { Pedido, PedidoSchema } from './pedido/schemas/pedido.schema';
import { ProductosManufacturadosModule } from '../productos-manufacturados/productos-manufacturados.module';

@Module({
  controllers: [EstadoPedidoController, PedidoController],
  providers: [EstadoPedidoService, PedidoService],
  imports: [
    MongooseModule.forFeature([
      { name: EstadoPedido.name, schema: EstadoPedidoSchema },
      { name: Pedido.name, schema: PedidoSchema },
    ]),
    AuthModule,
    ProductosManufacturadosModule,
  ],
})
export class PedidosModule {}
