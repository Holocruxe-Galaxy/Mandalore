import { IsDate, IsIn, IsString } from 'class-validator';
import { civilStatus, gender } from '../types';

export class CreatePersonalDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsIn(gender)
  gender: string;

  @IsString()
  birthdate: string;

  @IsIn(civilStatus)
  civilStatus: string;
}
