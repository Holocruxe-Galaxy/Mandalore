import { IsArray, IsDate, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateNoteDto } from './note.dto';
import { UpdateTaskDto } from './task.dto';

import { Note, Task } from '../interfaces';

export class UpdateDtos {
  @IsOptional()
  @Type(() => UpdateNoteDto)
  @ValidateNested()
  notes: Note;

  @IsOptional()
  @Type(() => UpdateTaskDto)
  @ValidateNested()
  tasks: Task;

  @Type(() => Date)
  @IsDate()
  createdAt: Date;
}

export class UpdateOrganizerDto {
  @IsArray()
  @Type(() => UpdateDtos)
  @ValidateNested()
  data: UpdateDtos[];
}
