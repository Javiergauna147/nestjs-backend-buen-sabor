import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class CreatePedidoDto {
  @IsMongoId()
  @IsOptional()
  cliente: string;

  @IsMongoId()
  @IsOptional()
  estado: string;

  @ValidateNested({
    each: true,
  })
  @Type(() => Productos)
  productos: Productos[];

  @IsNumber()
  @IsOptional()
  precio: number;

  @IsOptional()
  adicionales: {
    envio: { estado: Boolean; value: { direccion: string } };
    cupon: { estado: Boolean; value: { codigo: string } };
  };
}

class Productos {
  @IsNumber()
  cantidad: number;
  @IsMongoId()
  producto: string;
}
