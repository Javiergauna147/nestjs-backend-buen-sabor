import { IsString, IsMongoId } from 'class-validator';

export class UpdateUserAdmDto {
  @IsMongoId()
  _id: string;
  @IsString()
  rol: string;
}
