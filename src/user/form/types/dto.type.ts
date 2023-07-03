import { CreateContactInfoDto, CreatePersonalDto } from 'src/user/dto';

const dtos = [new CreateContactInfoDto(), new CreatePersonalDto()] as const;

export type DtoType = (typeof dtos)[number];
