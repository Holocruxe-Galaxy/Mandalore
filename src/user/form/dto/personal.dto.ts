import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsIn, IsOptional, IsString } from 'class-validator';
import {
  CivilStatusType,
  GenderType,
  civilStatus,
  gender,
} from 'src/user/types';
import { personalExample } from '../examples';

export class PersonalDto {
  @IsString()
  @ApiProperty({ type: String, example: personalExample.name })
  name: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, example: personalExample.lastName })
  lastName?: string;

  @IsIn(gender)
  @ApiProperty({ enum: gender, example: personalExample.gender })
  gender: GenderType;

  @Type(() => Date)
  @IsDate()
  @ApiProperty({ type: Date, example: personalExample.birthdate })
  birthdate: Date;

  @IsIn(civilStatus)
  @ApiProperty({ enum: civilStatus, example: personalExample.civilStatus })
  civilStatus: CivilStatusType;
}

export class PartialPersonalDto extends PartialType(PersonalDto) {
  @IsString()
  @ApiPropertyOptional({ type: String, example: personalExample.name })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, example: personalExample.lastName })
  lastName?: string;

  @IsIn(gender)
  @ApiPropertyOptional({ enum: gender, example: personalExample.gender })
  gender?: GenderType;

  @Type(() => Date)
  @IsDate()
  @ApiPropertyOptional({ type: Date, example: personalExample.birthdate })
  birthdate?: Date;

  @IsIn(civilStatus)
  @ApiPropertyOptional({
    enum: civilStatus,
    example: personalExample.civilStatus,
  })
  civilStatus?: CivilStatusType;
}
