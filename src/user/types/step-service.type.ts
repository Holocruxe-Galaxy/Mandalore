import { LoginAuthDto } from 'src/auth/dto';
import { StepService } from './../interfaces';

export const stepService: ReadonlyArray<StepService> = [
  { step: 1, service: 'personalService', dto: LoginAuthDto },
  { step: 2, service: 'contactInfoService', dto: 'Panchito' },
] as const;

export type StepServiceType = (typeof stepService)[number];
