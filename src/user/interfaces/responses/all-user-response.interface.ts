import { ObjectId } from 'mongoose';
import { StatusType } from 'src/user/types';

export interface Select {
  _id: ObjectId;
  email: string;
  status: StatusType;
}
