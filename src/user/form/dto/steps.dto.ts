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

export class StepsDto {
  @IsOptional()
  @Type(() => ContactInfoDto)
  @ValidateNested()
  contactInfo: ContactInfo;

  @IsOptional()
  @Type(() => GeneralInterestsDto)
  @ValidateNested()
  generalInterests: GeneralInterests;

  @IsOptional()
  @Type(() => LocationDto)
  @ValidateNested()
  location: Location;

  @IsOptional()
  @Type(() => PersonalDto)
  @ValidateNested()
  personal: Personal;

  @IsOptional()
  @Type(() => ProfessionalDto)
  @ValidateNested()
  professional: Professional;
}
