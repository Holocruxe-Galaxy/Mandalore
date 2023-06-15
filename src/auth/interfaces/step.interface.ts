import { StepType, DtoType, StepServiceType } from '../types';

interface StepData<T extends StepType, U, V> {
  name: T;
  dto: U;
  stepService: V;
}

export interface Step {
  [key: number]: StepData<StepType, DtoType, StepServiceType>;
}
