import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateContactInfoDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEmail()
  altEmail: string;

  @IsString()
  phone: string;

  @IsString()
  zipCode: string;
}
