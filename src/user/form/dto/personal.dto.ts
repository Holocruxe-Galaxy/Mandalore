import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
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

export class PartialPersonalDto extends PartialType(PersonalDto) {}
