import { IsString, IsEmail, IsOptional } from 'class-validator';

export class SignupAuthDto {
  @IsString()
  username: string;

  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  image_profile_url: string;

  @IsString()
  birthdate: string;
}
