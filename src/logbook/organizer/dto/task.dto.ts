import { IsArray, IsString } from 'class-validator';

export class TaskDto {
  @IsString()
  title: string;

  @IsString()
  @IsArray()
  name: string[];
}
