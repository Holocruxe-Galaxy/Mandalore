import { CreateLocationDto, CreatePersonalDto } from 'src/user/dto';
import { ContactInfo } from 'src/user/schemas';

const dtos = [
  ContactInfo,
  new CreateLocationDto(),
  new CreatePersonalDto(),
] as const;

export type DtoType = (typeof dtos)[number];
