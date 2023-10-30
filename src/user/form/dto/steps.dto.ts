import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import {
  ContactInfoDto,
  GeneralInterestsDto,
  LocationDto,
  PersonalDto,
  ProfessionalDto,
} from './';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  contactInfoExample,
  generalInterestsExample,
  locationExample,
  personalExample,
  professionalExample,
} from '../examples';

export class StepsDto {
  @IsOptional()
  @Type(() => ContactInfoDto)
  @ValidateNested()
  @ApiPropertyOptional({ type: ContactInfoDto, example: contactInfoExample })
  contactInfo?: ContactInfoDto;

  @IsOptional()
  @Type(() => GeneralInterestsDto)
  @ValidateNested()
  @ApiPropertyOptional({
    type: GeneralInterestsDto,
    example: generalInterestsExample,
  })
  generalInterests?: GeneralInterestsDto;

  @IsOptional()
  @Type(() => LocationDto)
  @ValidateNested()
  @ApiPropertyOptional({ type: LocationDto, example: locationExample })
  location?: LocationDto;

  @IsOptional()
  @Type(() => PersonalDto)
  @ValidateNested()
  @ApiPropertyOptional({ type: PersonalDto, example: personalExample })
  personal?: PersonalDto;

  @IsOptional()
  @Type(() => ProfessionalDto)
  @ValidateNested()
  @ApiPropertyOptional({ type: ProfessionalDto, example: professionalExample })
  professional?: ProfessionalDto;
}
