import { Type } from "class-transformer";
import { IsMongoId, IsNumber, IsOptional, ValidateNested } from "class-validator";

export class CreatePedidoDto {

    @IsMongoId()
    @IsOptional()
    cliente: string;

    @IsMongoId()
    estado: string;
    
    @ValidateNested({
        each: true
    })
    @Type(() => Productos)
    productos: Productos[]

    //TODO: Calcular precio desde el backend
    @IsNumber()
    @IsOptional()
    precio: number;

}

class Productos {
    @IsNumber()
    cantidad: number;
    @IsMongoId()
    producto: string;
}