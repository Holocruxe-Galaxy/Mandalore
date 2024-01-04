import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class NoteDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}

export class UpdateNoteDto extends PartialType(NoteDto) {}
