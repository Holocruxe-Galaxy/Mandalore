import { StatusType } from 'src/user/types';

export interface ProfileData {
  name: string;
  birthdate: string;
  provinceOrState: string;
  country: string;
  phone: string;
  email: string;
  language: string;
  status: StatusType;
  city?: string;
}
