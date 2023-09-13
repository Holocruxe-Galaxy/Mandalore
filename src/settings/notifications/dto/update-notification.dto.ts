import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateNotificationDto {
  @IsOptional()
  @IsBoolean()
  app: boolean;

  @IsOptional()
  @IsBoolean()
  email: boolean;
}
