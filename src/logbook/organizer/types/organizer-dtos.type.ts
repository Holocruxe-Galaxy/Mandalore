import { UpdateOrganizerDto } from '../dto';

// interface OrganizerWithDelete extends UpdateOrganizerDto {
//   deletedAt?: Date;
// }

export type OrganizerDtosType = {
  [K in keyof UpdateOrganizerDto]?: UpdateOrganizerDto[K];
};
