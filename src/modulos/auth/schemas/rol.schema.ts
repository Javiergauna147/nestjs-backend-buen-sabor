import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RolDocument = HydratedDocument<Rol>;

@Schema()
export class Rol {
  @Prop({
    unique: true,
  })
  rol: string;
}

export const RolSchema = SchemaFactory.createForClass(Rol);
