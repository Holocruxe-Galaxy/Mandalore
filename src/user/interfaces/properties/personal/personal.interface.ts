import { CivilStatusType, GenderType } from './types';

export interface Personal {
  name: string;
  lastName: string;
  gender: GenderType;
  birthdate: string;
  civilStatus: CivilStatusType;
}
