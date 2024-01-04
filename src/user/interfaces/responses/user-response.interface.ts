import { StatusType } from 'src/user/types';

interface UserResponse {
  status: StatusType;
}

export interface Pending extends UserResponse {
  step: number;
}

export interface Complete extends UserResponse {
  country?: string;
}
