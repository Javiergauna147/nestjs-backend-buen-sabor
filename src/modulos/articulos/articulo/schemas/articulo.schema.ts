import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { RubroArticulo } from '../../rubro-articulo/schemas/rubro-articulo.schema';

export type ArticuloDocument = HydratedDocument<Articulo>;

@Schema()
export class Articulo {
  @Prop({
    unique: true,
  })
  nombre: string;

  @Prop({
    unique: true,
  })
  denominacion: string;

  @Prop()
  descripcion: string;

  @Prop()
  marca: string;

  @Prop()
  stock: number;

  @Prop()
  stockMinimo: number;

  @Prop()
  stockMaximo: number;

  @Prop()
  requiereRefrigeracion: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'RubroArticulo' })
  rubro: RubroArticulo;
}

export const ArticuloSchema = SchemaFactory.createForClass(Articulo);
