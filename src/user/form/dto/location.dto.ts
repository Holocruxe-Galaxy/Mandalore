import { IsOptional, IsString } from 'class-validator';

export class LocationDto {
  @IsString()
  country: string;

  @IsString()
  provinceOrState: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  address: string;
}
