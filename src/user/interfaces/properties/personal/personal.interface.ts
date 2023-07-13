import { CivilStatusType, GenderType } from 'src/user/types';

export interface Personal {
  name: string;
  lastName: string;
  gender: GenderType;
  birthdate: string;
  civilStatus: CivilStatusType;
}
