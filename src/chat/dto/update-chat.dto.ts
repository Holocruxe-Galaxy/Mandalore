import { PartialType } from '@nestjs/mapped-types';
import { Message } from './message.dto';

export class UpdateChatDto extends PartialType(Message) {
  id: number;
}
