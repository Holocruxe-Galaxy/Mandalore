import { IsOptional, IsString } from 'class-validator';

export class LocationDto {
  @IsString()
  country: string;

  @IsString()
  provinceOrState: string;

  @IsOptional()
  city: string;

  @IsOptional()
  @IsString()
  address: string;
}
