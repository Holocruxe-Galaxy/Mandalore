import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './createMessage.dto';

export class UpdateChatDto extends PartialType(CreateMessageDto) {
  id: number;
}
