import { IsOptional, IsString } from 'class-validator';

export class CreateDiaryDto {
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  emoji: string;
}
