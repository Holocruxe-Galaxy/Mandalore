import { PartialType } from '@nestjs/mapped-types';
import { OrganizerDto } from './organizer.dto';

export class UpdateOrganizerDto extends PartialType(OrganizerDto) {}
