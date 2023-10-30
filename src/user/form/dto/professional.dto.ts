import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString } from 'class-validator';
import { EducationLevelType, educationLevel } from 'src/user/types';
import { professionalExample } from '../examples';

export class ProfessionalDto {
  @IsIn(educationLevel)
  @ApiProperty({
    enum: educationLevel,
    example: professionalExample.educationLevel,
  })
  educationLevel: EducationLevelType;

  @IsNumber()
  @ApiProperty({ type: Number, example: professionalExample.graduationYear })
  graduationYear: number;

  @IsString()
  @ApiProperty({ type: String, example: professionalExample.academicField })
  academicField: string;

  @IsString()
  @ApiProperty({ type: String, example: professionalExample.occupation })
  occupation: string;

  @IsString()
  @ApiProperty({ type: String, example: professionalExample.job })
  job: string;
}

export class PartialProfessionalDto extends PartialType(ProfessionalDto) {
  @IsIn(educationLevel)
  @ApiPropertyOptional({
    enum: educationLevel,
    example: professionalExample.educationLevel,
  })
  educationLevel?: EducationLevelType;

  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    example: professionalExample.graduationYear,
  })
  graduationYear?: number;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: professionalExample.academicField,
  })
  academicField?: string;

  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: professionalExample.occupation,
  })
  occupation?: string;

  @IsString()
  @ApiPropertyOptional({ type: String, example: professionalExample.job })
  job?: string;
}
