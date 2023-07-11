import { StatusType } from 'src/user/types';
import { status } from './../../types/properties/status.type';

export interface UserSteps<T> {
  [key: string]: T;
}

interface bla<T> extends UserSteps {
  status?: StatusType;
}
