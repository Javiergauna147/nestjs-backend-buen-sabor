import { IsString } from "class-validator";

export class CreateEstadoPedidoDto {

    @IsString()
    nombre: string;

}