import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RubroArticuloDocument = HydratedDocument<RubroArticulo>;

@Schema()
export class RubroArticulo {
  @Prop({
    unique: true
  })
  nombre: string;
}

export const RubroArticuloSchema = SchemaFactory.createForClass(RubroArticulo);