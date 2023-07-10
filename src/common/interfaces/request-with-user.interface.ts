import { Request } from 'express';
import { UserKey } from './user-key.interface';

export interface RequestWidhUser extends Request {
  user: UserKey;
}
