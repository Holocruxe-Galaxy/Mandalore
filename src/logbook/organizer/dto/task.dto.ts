import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class StepDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  done: boolean;
}

class UpdateStepDto extends OmitType(StepDto, ['done'] as const) {
  @IsBoolean()
  done: boolean;
}

export class TaskDto {
  @IsString()
  title: string;

  @IsArray()
  @Type(() => StepDto)
  @ValidateNested()
  steps: StepDto[];
}

export class UpdateTaskDto extends PartialType(
  OmitType(TaskDto, ['steps'] as const),
) {
  @IsOptional()
  @IsArray()
  @Type(() => UpdateStepDto)
  @ValidateNested()
  steps: UpdateStepDto[];
}
