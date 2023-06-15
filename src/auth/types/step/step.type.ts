import { CreateContactInfoDto, CreatePersonalDto } from 'src/auth/dto';

const step = ['contactInfo', 'personal'] as const;
const dto = [CreateContactInfoDto, CreatePersonalDto];

export type StepType = (typeof step)[number];
export type DtoType = (typeof dto)[number];
export type StepServiceType = `${StepType}Service`;
