import { UpdateDtos } from '../dto';

export type OrganizerDtosType = {
  [K in keyof UpdateDtos]?: UpdateDtos[K];
};
