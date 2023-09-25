import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import {
  ContactInfo,
  GeneralInterests,
  Location,
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
import { ApiProperty } from '@nestjs/swagger';

export class StepsDto {
  @IsOptional()
  @Type(() => ContactInfoDto)
  @ValidateNested()
  @ApiProperty()
  contactInfo: ContactInfo;

  @IsOptional()
  @Type(() => GeneralInterestsDto)
  @ValidateNested()
  @ApiProperty()
  generalInterests: GeneralInterests;

  @IsOptional()
  @Type(() => LocationDto)
  @ValidateNested()
  @ApiProperty()
  location: Location;

  @IsOptional()
  @Type(() => PersonalDto)
  @ValidateNested()
  @ApiProperty()
  personal: Personal;

  @IsOptional()
  @Type(() => ProfessionalDto)
  @ValidateNested()
  @ApiProperty()
  professional: Professional;
}
