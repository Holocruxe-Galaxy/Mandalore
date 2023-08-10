import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';

export class FinancesDto {
  @IsNumber()
  initialBalance: number;

  @IsNumber()
  spendings: number;

  @IsString()
  description: string;
}

export class UpdateFinancesDto extends PartialType(FinancesDto) {}
