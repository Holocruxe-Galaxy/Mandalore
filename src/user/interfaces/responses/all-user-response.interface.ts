import { ObjectId } from 'mongoose';
import { PlanType, RoleType, StatusType } from 'src/user/types';

export interface Select {
  _id: ObjectId;
  email: string;
  plan: PlanType;
  role: RoleType;
  status: StatusType;
}
