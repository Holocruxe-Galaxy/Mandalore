import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { UsePipes } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { ChatService } from './chat.service';
import { Message } from './dto/message.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ParseSocketContent } from './pipes/parse-socket-content.pipe';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    this.chatService.registerClient(client);
  }
  handleDisconnect(client: Socket) {
    return this.chatService.removeClient(client.id);
  }

  @UsePipes(new ParseSocketContent())
  @SubscribeMessage('broadcast')
  broadCast(@MessageBody() message: Message) {
    return this.chatService.broadcast(message, this.server);
  }

  @UsePipes(new ParseSocketContent())
  @SubscribeMessage('createChat')
  create(@MessageBody() message: Message) {
    return this.chatService.create(message);
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
