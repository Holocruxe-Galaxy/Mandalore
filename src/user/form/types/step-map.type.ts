import { StepsDto } from '../dto';

export type StepMap = {
  [K in keyof StepsDto]: StepsDto[K];
};
