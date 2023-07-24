import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Inject, UseGuards, UsePipes, forwardRef } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ChatService } from './chat.service';
import { Message } from './dto';

import { ParseSocketContent } from './pipes';
import { WsGuard } from './guards/ws.guard';
import { AuthService } from 'src/auth/auth.service';

// @UseGuards(WsGuard)
@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatService: ChatService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  @WebSocketServer() server: Server;

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.headers.authorization;
      await this.authService.isUser(token);

      this.chatService.registerClient(client);
    } catch (error) {
      client.emit('exception', [error.message]);
      client.disconnect();
    }
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
