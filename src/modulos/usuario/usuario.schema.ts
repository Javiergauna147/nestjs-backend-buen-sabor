import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema()
export class Usuario {
  @Prop()
  nombre: string;

  @Prop()
  apellido: string;

  @Prop()
  email: string;

  @Prop()
  telefono: string;

  @Prop()
  rol: string;

}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);