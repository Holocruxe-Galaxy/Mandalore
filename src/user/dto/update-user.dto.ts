import { IsArray, IsDate, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsDate()
  @IsOptional()
  birthDate?: Date;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interests?: string[];
}
