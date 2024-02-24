import { EventsModuleModule } from './modulos/events/eventsmodule.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './modulos/auth/auth.module';
import { ArticulosModule } from './modulos/articulos/articulos.module';
import { ProductosManufacturadosModule } from './modulos/productos-manufacturados/productos-manufacturados.module';
import { PedidosModule } from './modulos/pedidos/pedidos.module';

@Module({
  imports: [
    EventsModuleModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.URLDB),
    AuthModule,
    ArticulosModule,
    ProductosManufacturadosModule,
    PedidosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
