import {
  CreateContactInfoDto,
  CreateLocationDto,
  CreatePersonalDto,
} from 'src/user/dto';

const dtos = [
  new CreateContactInfoDto(),
  new CreateLocationDto(),
  new CreatePersonalDto(),
] as const;

export type DtoType = (typeof dtos)[number];
