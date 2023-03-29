import { IsString } from "class-validator";

export class CreateRubroProductoManufacturadoDto {
    @IsString()
    nombre: string;
}