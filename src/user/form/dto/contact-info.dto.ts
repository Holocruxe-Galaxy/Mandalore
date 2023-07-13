import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class ContactInfoDto {
  @IsOptional()
  @IsEmail()
  altEmail: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  zipCode: string;
}
