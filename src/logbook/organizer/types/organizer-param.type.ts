import { OrganizerDto } from '../dto';

export const organizerDtoList = ['finances', 'notes', 'tasks'];

export type OrganizerParamsType = keyof OrganizerDto;
