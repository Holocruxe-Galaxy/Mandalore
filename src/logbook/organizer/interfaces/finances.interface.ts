import { Root } from './root.interface';

export interface Finances extends Root {
  date: Date;
  initialBalance: number;
  spendings: number;
  result: number;
  description: string;
}
