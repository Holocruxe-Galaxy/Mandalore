import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { contactInfoExample } from '../examples';

export class ContactInfoDto {
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({ type: String, example: contactInfoExample.altEmail })
  altEmail?: string;

  @IsPhoneNumber()
  @ApiProperty({ type: String, example: contactInfoExample.phone })
  phone: string;

  @IsString()
  @ApiProperty({ type: String, example: contactInfoExample.zipCode })
  zipCode: string;
}

export class PartialContactInfoDto extends PartialType(ContactInfoDto) {
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({ type: String, example: contactInfoExample.altEmail })
  altEmail?: string;

  @IsPhoneNumber()
  @ApiPropertyOptional({ type: String, example: contactInfoExample.phone })
  phone?: string;

  @IsString()
  @ApiPropertyOptional({ type: String, example: contactInfoExample.zipCode })
  zipCode?: string;
}
