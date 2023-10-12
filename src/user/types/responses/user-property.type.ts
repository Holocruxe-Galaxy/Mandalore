import { StatusType } from 'src/user/types';
import { StepMap } from 'src/user/form/types';

export type UserProperty = StepMap & { status?: StatusType; step?: number };
