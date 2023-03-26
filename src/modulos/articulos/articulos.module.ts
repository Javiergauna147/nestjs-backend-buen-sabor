import { Module } from '@nestjs/common';
import { ArticuloController } from './articulo/articulo.controller';
import { RubroArticuloController } from './rubro-articulo/rubro-articulo.controller';
import { ArticuloService } from './articulo/articulo.service';
import { RubroArticuloService } from './rubro-articulo/rubro-articulo.service';

@Module({
  controllers: [ArticuloController, RubroArticuloController],
  providers: [ArticuloService, RubroArticuloService]
})
export class ArticulosModule {}
