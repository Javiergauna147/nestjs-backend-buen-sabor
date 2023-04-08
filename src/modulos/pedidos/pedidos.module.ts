import { Module } from '@nestjs/common';
import { EstadoPedidoController } from './estado-pedido/estado-pedido.controller';
import { EstadoPedidoService } from './estado-pedido/estado-pedido.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { EstadoPedido, EstadoPedidoSchema } from './estado-pedido/schemas/estado-pedido.schema';

@Module({
  controllers: [EstadoPedidoController],
  providers: [EstadoPedidoService],
  imports: [
    MongooseModule.forFeature([
      {name: EstadoPedido.name, schema: EstadoPedidoSchema},
    ]),
    AuthModule
  ]
})
export class PedidosModule {}
