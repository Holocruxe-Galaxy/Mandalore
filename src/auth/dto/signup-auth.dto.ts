import { IsString, IsEmail } from 'class-validator';

export class SignupAuthDto {
  @IsString()
  username: string;

  // @IsString()
  // name: string;

  // @IsString()
  // lastname: string;

  // @IsEmail()
  // email: string;

  // @IsString()
  // birthdate: string;
}
