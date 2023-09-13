import {
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateArticuloDto {
  @IsMongoId()
  id: string;
  @IsOptional()
  @IsString()
  nombre?: string;
  @IsOptional()
  @IsString()
  denominacion?: string;
  @IsOptional()
  @IsString()
  descripcion?: string;
  @IsOptional()
  @IsString()
  marca?: string;
  @IsOptional()
  @IsNumber()
  stock?: number;
  @IsOptional()
  @IsNumber()
  stockMinimo?: number;
  @IsOptional()
  @IsNumber()
  stockMaximo?: number;
  @IsOptional()
  @IsBoolean()
  requiereRefrigeracion?: boolean;
  @IsOptional()
  @IsMongoId()
  rubro?: string;
}
