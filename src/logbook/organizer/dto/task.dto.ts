import { IsArray, IsOptional, IsString } from 'class-validator';

export class TaskDto {
  @IsString()
  title: string;

  @IsString()
  @IsArray()
  name: string[];
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  @IsArray()
  name: string[];
}
