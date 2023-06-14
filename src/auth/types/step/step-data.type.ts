import { Step } from 'src/auth/interfaces';
import { CreateContactInfoDto, CreatePersonalDto } from 'src/auth/dto';

export const stepData = {
  1: { name: 'contactInfo', dto: CreateContactInfoDto },
  2: { name: 'personal', dto: CreatePersonalDto },
} as const;

export type StepDataKeys = keyof typeof stepData;

export function isStepKey(key: any): key is StepDataKeys {
  return stepData.hasOwnProperty(key);
}

export type StepDataValues = (typeof stepData)[StepDataKeys];
