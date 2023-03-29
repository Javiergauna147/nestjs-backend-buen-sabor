import { Module } from '@nestjs/common';
import { RubroProductoManuacturadoController } from './rubro-producto-manuacturado/rubro-producto-manuacturado.controller';
import { ProductoManuacturadoController } from './producto-manuacturado/producto-manuacturado.controller';
import { ProductoManuacturadoService } from './producto-manuacturado/producto-manuacturado.service';
import { RubroProductoManuacturadoService } from './rubro-producto-manuacturado/rubro-producto-manuacturado.service';

@Module({
  controllers: [RubroProductoManuacturadoController, ProductoManuacturadoController],
  providers: [ProductoManuacturadoService, RubroProductoManuacturadoService]
})
export class ProductosManufacturadosModule {}
