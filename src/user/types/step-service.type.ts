import { StepService } from './../interfaces';

export const stepService: ReadonlyArray<StepService> = [
  { step: 1, service: 'personalService' },
  { step: 1, service: 'contactInfoService' },
] as const;

export type StepServiceType = (typeof stepService)[number];
