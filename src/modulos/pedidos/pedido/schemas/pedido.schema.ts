import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Usuario } from "src/modulos/auth/schemas/usuario.schema";
import { EstadoPedido } from "../../estado-pedido/schemas/estado-pedido.schema";

export type PedidoDocument = HydratedDocument<Pedido>

@Schema()
export class Pedido {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'})
    cliente: Usuario;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'EstadoPedido'})
    estado: EstadoPedido;

    @Prop({type: [raw({
            cantidad: { type: Number },
            producto: {type: mongoose.Schema.Types.ObjectId, ref: 'ProductoManufacturado'}
        })],
        _id: false
    })
    productos: { cantidad: number, producto: string }[]
    
    @Prop()
    precio: number;
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);