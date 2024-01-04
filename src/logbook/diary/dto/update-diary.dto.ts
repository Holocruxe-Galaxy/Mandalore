import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateDiaryDto } from './create-diary.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { diaryExample } from '../examples/diary.example';

export class UpdateDiaryDto extends PartialType(CreateDiaryDto) {
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    type: String,
    example: diaryExample.favorite,
    description: '',
  })
  favorite?: boolean;
}
