import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateNotificationDto {
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  app: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  email: boolean;
}
