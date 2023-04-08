import { IsMongoId, IsNumber, IsString, ValidateNested } from "class-validator";
import { RubroProductoManufacturado } from '../../rubro-producto-manuacturado/schemas/rubro-producto-manufacturado.schema';

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


}