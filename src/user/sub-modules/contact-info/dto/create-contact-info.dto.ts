import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateContactInfoDto {
  @IsOptional()
  @IsEmail()
  altEmail: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  zipCode: string;
}
