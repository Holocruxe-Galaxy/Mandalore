import { PersonalDto } from '../dto';

export const personalExample: PersonalDto = {
  name: 'Juan',
  lastName: 'Pérez',
  birthdate: '01/01/2001' as unknown as Date,
  gender: 'MALE',
  civilStatus: 'SINGLE',
};
