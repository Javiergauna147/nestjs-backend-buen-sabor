import { Module } from '@nestjs/common';
import { RubroProductoManufacturadoController } from './rubro-producto-manuacturado/rubro-producto-manufacturado.controller';
import { ProductoManuacturadoController } from './producto-manuacturado/producto-manuacturado.controller';
import { ProductoManuacturadoService } from './producto-manuacturado/producto-manuacturado.service';
import { RubroProductoManufacturadoService } from './rubro-producto-manuacturado/rubro-producto-manufacturado.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RubroProductoManufacturado, RubroProductoManufacturadoSchema } from './rubro-producto-manuacturado/schemas/rubro-producto-manufacturado.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [RubroProductoManufacturadoController, ProductoManuacturadoController],
  providers: [ProductoManuacturadoService, RubroProductoManufacturadoService],
  imports: [
    MongooseModule.forFeature([
      {name: RubroProductoManufacturado.name, schema: RubroProductoManufacturadoSchema}
    ]),
    AuthModule
  ]
})
export class ProductosManufacturadosModule {}
