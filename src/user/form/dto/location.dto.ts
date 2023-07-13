import { IsString } from 'class-validator';

export class LocationDto {
  @IsString()
  country: string;
}
