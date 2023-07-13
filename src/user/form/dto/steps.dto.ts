import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { ContactInfo, Location, Personal } from 'src/user/interfaces';
import { ContactInfoDto, LocationDto, PersonalDto } from './';

export class StepsDto {
  @IsOptional()
  @Type(() => ContactInfoDto)
  @ValidateNested()
  contactInfo: ContactInfo;

  @IsOptional()
  @Type(() => LocationDto)
  @ValidateNested()
  location: Location;

  @IsOptional()
  @Type(() => PersonalDto)
  @ValidateNested()
  personal: Personal;
}
