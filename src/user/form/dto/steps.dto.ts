import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { CreateContactInfoDto, CreatePersonalDto } from 'src/user/dto';

export class StepsDto {
  @IsOptional()
  @Type(() => CreateContactInfoDto)
  @ValidateNested()
  contactInfo: CreateContactInfoDto;

  @IsOptional()
  @Type(() => CreatePersonalDto)
  @ValidateNested()
  personal: CreatePersonalDto;
}
