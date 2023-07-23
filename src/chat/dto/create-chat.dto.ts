import { IsNumber, IsString } from 'class-validator';

export class CreateChatDto {
  @IsNumber()
  message: string;
}
