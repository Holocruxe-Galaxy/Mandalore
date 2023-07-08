import { IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  country: string;
}
