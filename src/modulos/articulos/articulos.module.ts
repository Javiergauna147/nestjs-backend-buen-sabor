import { Module } from '@nestjs/common';
import { ArticuloController } from './articulo/articulo.controller';
import { RubroArticuloController } from './rubro-articulo/rubro-articulo.controller';
import { ArticuloService } from './articulo/articulo.service';
import { RubroArticuloService } from './rubro-articulo/rubro-articulo.service';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RubroArticulo,
  RubroArticuloSchema,
} from './rubro-articulo/schemas/rubro-articulo.schema';
import { Articulo, ArticuloSchema } from './articulo/schemas/articulo.schema';

@Module({
  controllers: [ArticuloController, RubroArticuloController],
  providers: [ArticuloService, RubroArticuloService],
  imports: [
    MongooseModule.forFeature([
      { name: RubroArticulo.name, schema: RubroArticuloSchema },
      { name: Articulo.name, schema: ArticuloSchema },
    ]),
    AuthModule,
  ],
})
export class ArticulosModule {}
