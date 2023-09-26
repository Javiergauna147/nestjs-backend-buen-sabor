import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserAdmDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(15)
  password: string;

  @IsString()
  rol: string;
}
