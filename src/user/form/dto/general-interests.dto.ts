import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsIn } from 'class-validator';
import { generalInterests, GeneralInterestsType } from 'src/user/types';
import { generalInterestsExample } from '../examples';

export class GeneralInterestsDto {
  @IsArray()
  @IsIn(generalInterests, { each: true })
  @ApiProperty({
    type: [generalInterests],
    enum: generalInterests,
    example: generalInterestsExample.likes,
  })
  likes: GeneralInterestsType[];
}

export class PartialGeneralInterestsDto extends PartialType(
  GeneralInterestsDto,
) {
  @IsArray()
  @IsIn(generalInterests, { each: true })
  @ApiPropertyOptional({
    type: [generalInterests],
    enum: generalInterests,
    example: generalInterestsExample.likes,
  })
  likes?: GeneralInterestsType[];
}
