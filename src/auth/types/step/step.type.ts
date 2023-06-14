import { CreateContactInfoDto, CreatePersonalDto } from 'src/auth/dto';

const step = ['contactInfo', 'personal'] as const;
const dto = [CreateContactInfoDto, CreatePersonalDto];

export type StepType = (typeof step)[number];
export type dtoType = (typeof dto)[number];
