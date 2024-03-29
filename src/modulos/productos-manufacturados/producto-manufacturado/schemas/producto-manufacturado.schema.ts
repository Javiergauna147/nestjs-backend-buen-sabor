import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { RubroProductoManufacturado } from '../../rubro-producto-manuacturado/schemas/rubro-producto-manufacturado.schema';

export type ProductoManufacturadoDocument =
  HydratedDocument<ProductoManufacturado>;

@Schema()
export class ProductoManufacturado {
  @Prop({
    unique: true,
  })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop()
  detallePreparacion: string;

  @Prop()
  precio: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RubroProductoManufacturado',
  })
  rubro: RubroProductoManufacturado;

  @Prop({
    type: [
      raw({
        cantidad: { type: Number },
        articulo: { type: mongoose.Schema.Types.ObjectId, ref: 'Articulo' },
      }),
    ],
    _id: false,
  })
  articulos: { cantidad: number; articulo: string }[];

  @Prop({
    type: [
      raw({
        nombre: { type: String, required: true },
        type: { type: String, required: true },
        data: { type: String, required: true },
      }),
    ],
    _id: false,
  })
  imagen: { nombre: string; type: string; data: string };
}

export const ProductoManufacturadoSchema = SchemaFactory.createForClass(
  ProductoManufacturado,
);
