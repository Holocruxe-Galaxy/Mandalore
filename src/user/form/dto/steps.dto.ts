import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import {
  CreateContactInfoDto,
  CreateLocationDto,
  CreatePersonalDto,
} from 'src/user/dto';
import { ContactInfo, Location, Personal } from 'src/user/interfaces';

export class StepsDto {
  @IsOptional()
  @Type(() => CreateContactInfoDto)
  @ValidateNested()
  contactInfo: ContactInfo;

  @IsOptional()
  @Type(() => CreateLocationDto)
  @ValidateNested()
  location: Location;

  @IsOptional()
  @Type(() => CreatePersonalDto)
  @ValidateNested()
  personal: Personal;
}
