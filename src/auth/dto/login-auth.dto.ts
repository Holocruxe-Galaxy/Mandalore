import { IsEmail, IsOptional, ValidateNested } from 'class-validator';
import { SignupAuthDto } from './signup-auth.dto';
import { Type } from 'class-transformer';

export class LoginAuthDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @Type(() => SignupAuthDto)
  @ValidateNested()
  personal: SignupAuthDto;
}
