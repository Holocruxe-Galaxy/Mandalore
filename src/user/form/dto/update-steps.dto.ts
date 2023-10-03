import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import {
  ContactInfo,
  GeneralInterests,
  Personal,
  Professional,
} from 'src/user/interfaces';
import {
  ContactInfoDto,
  GeneralInterestsDto,
  LocationDto,
  PersonalDto,
  ProfessionalDto,
} from './';

export class UpdateStepsDto {
  @IsOptional()
  @Type(() => PartialType(ContactInfoDto))
  @ValidateNested()
  @ApiProperty()
  contactInfo: ContactInfo;

  @IsOptional()
  @Type(() => PartialType(GeneralInterestsDto))
  @ValidateNested()
  @ApiProperty()
  generalInterests: GeneralInterests;

  @IsOptional()
  @Type(() => PartialType(LocationDto))
  @ValidateNested()
  @ApiProperty()
  location: LocationDto;

  @IsOptional()
  @Type(() => PartialType(PersonalDto))
  @ValidateNested()
  @ApiProperty()
  personal: Personal;

  @IsOptional()
  @Type(() => PartialType(ProfessionalDto))
  @ValidateNested()
  @ApiProperty()
  professional: Professional;
}
