import { IsMongoId } from 'class-validator';

export class DeleteUserAdmDto {
  @IsMongoId()
  _id: string;
}
