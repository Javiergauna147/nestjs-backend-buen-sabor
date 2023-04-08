import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { RubroProductoManufacturado } from '../../rubro-producto-manuacturado/schemas/rubro-producto-manufacturado.schema';

export type ProductoManufacturadoDocument = HydratedDocument<ProductoManufacturado>

@Schema()
export class ProductoManufacturado {

    @Prop({
        unique: true
    })
    nombre: string;
    
    @Prop()
    descripcion: string;

    @Prop()
    detallePreparacion: string;

    @Prop()
    precio: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'RubroProductoManufacturado'})
    rubro: RubroProductoManufacturado;

}

export const ProductoManufacturadoSchema = SchemaFactory.createForClass(ProductoManufacturado);