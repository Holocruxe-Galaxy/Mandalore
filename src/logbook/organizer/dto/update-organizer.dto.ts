import { IsArray, IsDate, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateFinancesDto, UpdateNoteDto, UpdateTaskDto } from './';

export class UpdateDtos {
  @IsOptional()
  @Type(() => UpdateNoteDto)
  @ValidateNested()
  notes: UpdateNoteDto;

  @IsOptional()
  @Type(() => UpdateTaskDto)
  @ValidateNested()
  tasks: UpdateTaskDto;

  @IsOptional()
  @Type(() => UpdateFinancesDto)
  @ValidateNested()
  finances: UpdateFinancesDto;

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
