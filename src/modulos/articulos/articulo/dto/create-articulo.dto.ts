import { IsBoolean, IsMongoId, IsNumber, IsString } from "class-validator";

export class CreateArticuloDto {
    @IsString()
    nombre: string;
    @IsString()
    denominacion: string;
    @IsString()
    descripcion: string;
    @IsString()
    marca: string;
    @IsNumber()
    stock: number;
    @IsNumber()
    stockMinimo: number;
    @IsNumber()
    stockMaximo: number;
    @IsBoolean()
    requiereRefrigeracion: boolean;
    @IsMongoId()
    rubro: string;
}