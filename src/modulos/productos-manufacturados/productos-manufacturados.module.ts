import { Module } from '@nestjs/common';
import { RubroProductoManufacturadoController } from './rubro-producto-manuacturado/rubro-producto-manufacturado.controller';
import { ProductoManufacturadoController } from './producto-manufacturado/producto-manufacturado.controller';
import { RubroProductoManufacturadoService } from './rubro-producto-manuacturado/rubro-producto-manufacturado.service';
import { ProductoManufacturadoService } from './producto-manufacturado/producto-manufacturado.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RubroProductoManufacturado, RubroProductoManufacturadoSchema } from './rubro-producto-manuacturado/schemas/rubro-producto-manufacturado.schema';
import { ProductoManufacturado, ProductoManufacturadoSchema } from './producto-manufacturado/schemas/producto-manufacturado.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [RubroProductoManufacturadoController, ProductoManufacturadoController],
  providers: [ProductoManufacturadoService, RubroProductoManufacturadoService],
  imports: [
    MongooseModule.forFeature([
      {name: RubroProductoManufacturado.name, schema: RubroProductoManufacturadoSchema},
      {name: ProductoManufacturado.name, schema: ProductoManufacturadoSchema}
    ]),
    AuthModule
  ],
  exports: [
    ProductoManufacturadoService
  ]
})
export class ProductosManufacturadosModule {}
