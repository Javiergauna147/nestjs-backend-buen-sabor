import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsuarioDocument = HydratedDocument<RubroArticulo>;

@Schema()
export class RubroArticulo {
  @Prop()
  nombre: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(RubroArticulo);