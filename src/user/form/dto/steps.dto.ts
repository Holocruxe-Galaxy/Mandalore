import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import {
  CreateContactInfoDto,
  CreateLocationDto,
  CreatePersonalDto,
} from 'src/user/dto';

export class StepsDto {
  @IsOptional()
  @Type(() => CreateContactInfoDto)
  @ValidateNested()
  contactInfo: CreateContactInfoDto;

  @IsOptional()
  @Type(() => CreateLocationDto)
  @ValidateNested()
  location: CreateLocationDto;

  @IsOptional()
  @Type(() => CreatePersonalDto)
  @ValidateNested()
  personal: CreatePersonalDto;
}
