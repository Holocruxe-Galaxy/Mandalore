import { ContactInfo, Personal } from 'src/user/schemas';
import { DtoType } from './dto.type';

const step = ['contactInfo', 'location', 'personal'] as const;

export type StepType = (typeof step)[number];

export type Step =
  | {
      contactInfo: ContactInfo;
    }
  | {
      personal: Personal;
    };
