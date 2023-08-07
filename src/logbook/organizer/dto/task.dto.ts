import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

class StepDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  done: boolean;
}

class UpdateStepDto extends PartialType(StepDto) {
  @IsBoolean()
  done: boolean;
}

export class TaskDto {
  @IsString()
  title: string;

  @IsArray()
  @Type(() => StepDto)
  steps: StepDto[];
}

export class UpdateTaskDto extends OmitType(TaskDto, ['steps'] as const) {
  @IsOptional()
  @IsArray()
  @Type(() => UpdateStepDto)
  steps: UpdateStepDto[];
}
