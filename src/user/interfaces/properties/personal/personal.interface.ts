import { CivilStatusType, GenderType } from 'src/user/types';

export interface Personal {
  name: string;
  lastName: string;
  language: string;
  gender: GenderType;
  birthdate: string;
  civilStatus: CivilStatusType;
}
