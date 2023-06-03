import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsOptional()
  @IsArray()
  @IsString()
  group: string[];
}
