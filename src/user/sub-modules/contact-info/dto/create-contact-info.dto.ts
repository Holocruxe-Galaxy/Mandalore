import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateContactInfoDto {
  @IsOptional()
  @IsEmail()
  altEmail: string;

  @IsString()
  phone: string;

  @IsString()
  zipCode: string;
}
