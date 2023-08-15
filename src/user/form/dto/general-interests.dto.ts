import { IsArray, IsIn } from 'class-validator';
import { generalInterests, generalInterestsType } from 'src/user/types';

export class GeneralInterestsDto {
  @IsArray()
  @IsIn(generalInterests, { each: true })
  likes: generalInterestsType[];
}
