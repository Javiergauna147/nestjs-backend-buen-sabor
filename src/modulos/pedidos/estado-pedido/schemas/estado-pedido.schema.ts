import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EstadoPedidoDocument = HydratedDocument<EstadoPedido>;

@Schema()
export class EstadoPedido {
  @Prop({
    unique: true,
  })
  nombre: string;
}

export const EstadoPedidoSchema = SchemaFactory.createForClass(EstadoPedido);
