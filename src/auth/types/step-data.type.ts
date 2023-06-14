// import { StepService } from '../interfaces';

export const stepData = {
  1: 'contactInfo',
  2: 'personal',
} as const;

export type StepDataKeys = keyof typeof stepData;

export function isStepKey(key: any): key is StepDataKeys {
  return stepData.hasOwnProperty(key);
}

export type StepDataValues = (typeof stepData)[StepDataKeys];
