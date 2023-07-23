import { IsNumber, IsString } from 'class-validator';

export class Message {
  @IsString()
  message: string;
}
