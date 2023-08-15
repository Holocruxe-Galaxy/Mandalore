import { IsIn, IsNumber, IsString } from 'class-validator';
import { EducationLevelType, educationLevel } from 'src/user/types';

export class ProfessionalDto {
  @IsIn(educationLevel)
  educationLevel: EducationLevelType;

  @IsNumber()
  graduationYear: number;

  @IsString()
  academicField: string;

  @IsString()
  occupation: string;

  @IsString()
  job: string;
}
