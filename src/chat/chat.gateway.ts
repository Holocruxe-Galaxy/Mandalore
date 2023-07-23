import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Socket } from 'socket.io';
import { UsePipes } from '@nestjs/common';
import { ParseSocketContent } from './pipes/parse-socket-content.pipe';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}
  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected`);
    // throw new Error('Method not implemented.');
  }
  handleDisconnect(client: Socket) {
    console.log('Client disconnected');
    // throw new Error('Method not implemented.');
  }

  @UsePipes(new ParseSocketContent())
  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    console.log(createChatDto);
    return this.chatService.create(createChatDto);
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }
}
