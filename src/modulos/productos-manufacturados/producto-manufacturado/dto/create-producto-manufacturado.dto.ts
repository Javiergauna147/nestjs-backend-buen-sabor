import { IsMongoId, IsNumber, IsString, ValidateNested } from "class-validator";

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
        each: true
    })
    articulos: {cantidad: number, articulo: string}[]

}