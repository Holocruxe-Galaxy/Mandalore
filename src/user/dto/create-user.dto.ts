import { IsIn, IsOptional, IsString } from 'class-validator';
import { StatusType, status } from '../types';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @IsIn(status)
  status: StatusType;

  @IsOptional()
  @IsString()
  group?: string;
}
