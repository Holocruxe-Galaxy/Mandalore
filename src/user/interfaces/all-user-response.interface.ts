import { ObjectId } from 'mongoose';
import { PlanType, RoleType, StatusType } from '../types';

export interface Select {
  _id: ObjectId;
  email: string;
  plan: PlanType;
  role: RoleType;
  status: StatusType;
}
