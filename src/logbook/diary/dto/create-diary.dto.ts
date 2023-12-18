import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { diaryExample } from '../examples/diary.example';

export class CreateDiaryDto {
  @IsString()
  @ApiProperty({ type: String, example: diaryExample.content })
  content: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, example: diaryExample.emoji })
  emoji?: string;

  @IsBoolean()
  @ApiProperty({
    type: String,
    example: diaryExample.favorite,
    description:
      'No matter what you pass in here, this property will always end up being false.',
  })
  favorite: boolean;
}
