import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { NoteDto, TaskDto } from './';
import { Note, Task } from '../interfaces';

export class OrganizerDto {
  @IsOptional()
  @Type(() => NoteDto)
  @ValidateNested()
  note: Note;

  @IsOptional()
  @Type(() => TaskDto)
  @ValidateNested()
  task: Task;
}
