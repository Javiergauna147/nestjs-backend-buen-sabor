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
    productos: {cantidad: number, producto: string}[]

    //TODO: Calcular precio desde el backend
    @IsNumber()
    precio: number;

}