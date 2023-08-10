import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatedAtDto {
  @Type(() => Date)
  @IsDate()
  createdAt: Date;
}
