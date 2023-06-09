import { Type } from 'class-transformer';
import { IsDate, IsIn, IsString } from 'class-validator';
import { civilStatus, gender } from '../types';

export class CreatePersonalDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsIn(gender)
  gender: string;

  @Type(() => Date)
  @IsDate()
  birthdate: Date;

  @IsIn(civilStatus)
  civilStatus: string;
}
