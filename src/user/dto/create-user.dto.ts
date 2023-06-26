import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';
import { StatusType, status } from '../types';

export class CreateUserDto {
  @IsEmail()
  email: string;
}
