import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema()
export class Usuario {
  @Prop({
    unique: true
  })
  email: string;

  @Prop()
  password: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);