import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RubroProductoManufacturadoDocument =
  HydratedDocument<RubroProductoManufacturado>;

@Schema()
export class RubroProductoManufacturado {
  @Prop({
    unique: true,
  })
  nombre: string;
}

export const RubroProductoManufacturadoSchema = SchemaFactory.createForClass(
  RubroProductoManufacturado,
);
