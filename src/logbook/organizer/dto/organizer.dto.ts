import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { FinancesDto, NoteDto, TaskDto } from './';

export class OrganizerDto {
  @IsOptional()
  @Type(() => NoteDto)
  @ValidateNested()
  notes: NoteDto;

  @IsOptional()
  @Type(() => TaskDto)
  @ValidateNested()
  tasks: TaskDto;

  @IsOptional()
  @Type(() => FinancesDto)
  @ValidateNested()
  finances: FinancesDto;
}
