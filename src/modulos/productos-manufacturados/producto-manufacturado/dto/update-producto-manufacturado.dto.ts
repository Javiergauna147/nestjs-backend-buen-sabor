import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsOptional,
  IsString,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class UpdateProductoManufacturadoDto {
  @IsMongoId()
  _id: string;

  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsString()
  detallePreparacion: string;

  @IsOptional()
  @IsNumber()
  precio: number;

  @IsOptional()
  @IsMongoId()
  rubro: string;

  @IsOptional()
  @ValidateNested({
    each: true,
  })
  @Type(() => Articulos)
  articulos: Articulos[];
}

class Articulos {
  @IsNumber()
  cantidad: number;
  @IsMongoId()
  articulo: string;
}
