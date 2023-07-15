import { PartialType } from '@nestjs/mapped-types';
import { CreateDiaryDto } from './create-diary.dto';
import { IsBoolean } from 'class-validator';

export class UpdateDiaryDto extends PartialType(CreateDiaryDto) {
  @IsBoolean()
  favorite: boolean;
}
