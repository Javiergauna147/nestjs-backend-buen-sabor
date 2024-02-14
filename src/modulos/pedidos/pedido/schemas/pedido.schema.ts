import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Usuario } from 'src/modulos/auth/schemas/usuario.schema';
import { EstadoPedido } from '../../estado-pedido/schemas/estado-pedido.schema';
import { ProductoManufacturado } from 'src/modulos/productos-manufacturados/producto-manufacturado/schemas/producto-manufacturado.schema';

export type PedidoDocument = HydratedDocument<Pedido>;

@Schema()
export class Pedido {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
    index: true,
  })
  cliente: Usuario;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'EstadoPedido'})
  estado: string;

  @Prop({
    type: [
      {
        cantidad: { type: Number },
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'ProductoManufacturado',
        },
      },
    ],
    _id: false,
  })
  productos: { cantidad: number; producto: string}[];

  @Prop({ required: true })
  precio: number;

  @Prop({type: Object, _id: false, default:{envio:{status:false, value:{direccion:''}}, cupon:{status:false, value:{codigo:''}}}})
  adicionales:{
    [x: string]: { status: boolean; value:Object },
    envio:{status:boolean, value:{direccion:string}},
    cupon:{status:boolean, value:{codigo:string}}
  }
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);
