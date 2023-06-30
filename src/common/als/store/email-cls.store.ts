import { ClsStore } from 'nestjs-cls';

export interface EmailClsStore extends ClsStore {
  email: string;
}
