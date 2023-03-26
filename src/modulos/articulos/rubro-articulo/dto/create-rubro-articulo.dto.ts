import { IsString } from "class-validator";

export class CreateRubroArticuloDto {
    @IsString()
    nombre: string;
}