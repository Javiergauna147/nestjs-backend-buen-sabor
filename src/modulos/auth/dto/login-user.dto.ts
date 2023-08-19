import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(15)
  password: string;
}
