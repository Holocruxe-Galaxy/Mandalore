import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { locationExample } from '../examples';

export class LocationDto {
  @IsString()
  @ApiProperty({ type: String, example: locationExample.country })
  country: string;

  @IsString()
  @ApiProperty({ type: String, example: locationExample.provinceOrState })
  provinceOrState: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, example: locationExample.city })
  city?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, example: locationExample.address })
  address?: string;

  @IsString()
  @ApiProperty({ type: String, example: locationExample.language })
  language: string;
}

export class PartialLocationDto extends PartialType(LocationDto) {
  @IsString()
  @ApiPropertyOptional({ type: String, example: locationExample.country })
  country?: string;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: locationExample.provinceOrState,
  })
  provinceOrState?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, example: locationExample.city })
  city?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, example: locationExample.address })
  address?: string;

  @IsString()
  @ApiPropertyOptional({ type: String, example: locationExample.language })
  language: string;
}
