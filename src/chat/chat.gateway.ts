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
import { Message } from './dto';

import { ParseSocketContent } from './pipes';

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
    this.server.emit('broadcast', this.chatService.broadcast(message));
  }

  @UsePipes(new ParseSocketContent())
  @SubscribeMessage('clientChat')
  clientChat(@MessageBody() message: Message) {
    this.chatService.clientChat(message);
  }
}
