import { PartialType } from '@nestjs/mapped-types';
import { CreateDiaryDto } from './create-diary.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateDiaryDto extends PartialType(CreateDiaryDto) {
  @IsOptional()
  @IsBoolean()
  favorite: boolean;
}
