import { IsOptional, IsString } from 'class-validator';

export class NoteDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;
}
