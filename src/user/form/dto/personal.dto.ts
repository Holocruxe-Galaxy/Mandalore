import { Type } from 'class-transformer';
import { IsDate, IsIn, IsOptional, IsString } from 'class-validator';
import {
  CivilStatusType,
  GenderType,
  civilStatus,
  gender,
} from 'src/user/types';

export class PersonalDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsIn(gender)
  gender: GenderType;

  @Type(() => Date)
  @IsDate()
  birthdate: Date;

  @IsIn(civilStatus)
  civilStatus: CivilStatusType;
}
