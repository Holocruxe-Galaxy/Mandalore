import { Request } from 'express';
import { UserKey } from './user-key.interface';

export interface RequestWithUser extends Request {
  user: UserKey;
}
