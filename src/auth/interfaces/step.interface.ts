import { StepType, dtoType } from '../types';

interface StepData {
  name: StepType;
  dto: dtoType;
}

export interface Step {
  1: StepData;
  2: StepData;
}
