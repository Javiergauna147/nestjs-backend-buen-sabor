import { IsString } from 'class-validator';

export class CreateRolDto {
  @IsString()
  rol: string;
}
