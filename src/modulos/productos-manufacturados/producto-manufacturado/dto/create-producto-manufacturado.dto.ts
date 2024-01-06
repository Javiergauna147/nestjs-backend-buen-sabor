import { Type } from 'class-transformer';
import { IsMongoId, IsNumber, IsString, ValidateNested } from 'class-validator';

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
}

class Articulos {
  @IsNumber()
  cantidad: number;
  @IsMongoId()
  articulo: string;
}
