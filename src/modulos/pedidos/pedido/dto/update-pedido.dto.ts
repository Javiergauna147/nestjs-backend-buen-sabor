import { IsMongoId, IsOptional } from 'class-validator';

export class UpdatePedidoDto {
  @IsMongoId()
  @IsOptional()
  _id: string;

  @IsMongoId()
  @IsOptional()
  estado: string;
}
