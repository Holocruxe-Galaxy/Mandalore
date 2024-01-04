import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import {
  ContactInfoDto,
  GeneralInterestsDto,
  LocationDto,
  PartialContactInfoDto,
  PartialGeneralInterestsDto,
  PartialLocationDto,
  PartialPersonalDto,
  PartialProfessionalDto,
  PersonalDto,
  ProfessionalDto,
} from './';
import {
  contactInfoExample,
  generalInterestsExample,
  locationExample,
  personalExample,
  professionalExample,
} from '../examples';

export class UpdateStepsDto {
  @IsOptional()
  @Type(() => PartialType(ContactInfoDto))
  @ValidateNested()
  @ApiPropertyOptional({
    type: PartialContactInfoDto,
    example: contactInfoExample,
  })
  contactInfo?: PartialContactInfoDto;

  @IsOptional()
  @Type(() => PartialType(GeneralInterestsDto))
  @ValidateNested()
  @ApiPropertyOptional({
    type: PartialGeneralInterestsDto,
    example: generalInterestsExample,
  })
  generalInterests?: GeneralInterestsDto;

  @IsOptional()
  @Type(() => PartialType(LocationDto))
  @ValidateNested()
  @ApiPropertyOptional({ type: PartialLocationDto, example: locationExample })
  location?: PartialLocationDto;

  @IsOptional()
  @Type(() => PartialType(PersonalDto))
  @ValidateNested()
  @ApiPropertyOptional({ type: PartialPersonalDto, example: personalExample })
  personal?: PartialPersonalDto;

  @IsOptional()
  @Type(() => PartialType(ProfessionalDto))
  @ValidateNested()
  @ApiPropertyOptional({
    type: PartialProfessionalDto,
    example: professionalExample,
  })
  professional?: PartialProfessionalDto;
}
