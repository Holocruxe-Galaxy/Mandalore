import { StepType, dtoType } from '../types';

interface StepData {
  name: StepType;
  dto: dtoType;
}

export interface Step {
  [key: number]: StepData;
}
