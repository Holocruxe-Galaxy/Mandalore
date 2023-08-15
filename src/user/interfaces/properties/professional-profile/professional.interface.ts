import { EducationLevelType } from 'src/user/types/properties/education-level.type';
// import { Institution } from './';

// export interface Professional {
//   internship: Institution;
//   softSkills: string[];
//   hardSkills: string[];
// }

export interface Professional {
  educationalLevel: EducationLevelType;
  graduationYear: number;
  academicField: string;
  occupation: string;
  job: string;
}
