import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

class Articulos {
  @IsNumber()
  cantidad: number;
  @IsMongoId()
  articulo: string;
}

class Imagen {
  @IsString()
  nombre: string;
  @IsString()
  type: string;
  @IsString()
  data: string;
}
export class CreateProductoManufacturadoDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsString()
  detallePreparacion: string;

  @IsNumber()
  precio: number;

  @IsMongoId()
  rubro: string;

  @ValidateNested({
    each: true,
  })
  @Type(() => Articulos)
  articulos: Articulos[];

  @IsObject()
  imagen: Imagen;
}
