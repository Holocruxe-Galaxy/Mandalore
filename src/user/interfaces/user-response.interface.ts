import { RoleType, StatusType } from '../types';

export interface Pending {
  role: RoleType;
  status: StatusType;
  step: number;
}

export interface Active {
  role: RoleType;
  status: StatusType;
  country: string;
}
