import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Inject, UseGuards, UsePipes, forwardRef } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { ChatService } from './chat.service';
import { Message } from './dto';

import { ParseSocketContent } from './pipes';
import { WsGuard } from './guards/ws.guard';
import { AuthService } from 'src/auth/auth.service';
import { UserKey } from 'src/common/interfaces';

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
      const email: UserKey = await this.authService.isUser(token);

      this.chatService.registerClient(client, email);
    } catch (error) {
      client.emit('exception', [error.message]);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    return this.chatService.removeClient(client.id);
  }

  @SubscribeMessage('broadcast')
  broadCast(
    @MessageBody(new ParseSocketContent()) message: Message,
    @ConnectedSocket() client: Socket,
  ) {
    this.server.emit('broadcast', this.chatService.broadcast(message, client));
  }

  @SubscribeMessage('clientChat')
  clientChat(
    @MessageBody(new ParseSocketContent()) message: Message,
    @ConnectedSocket() client: Socket,
  ) {
    this.chatService.clientChat(message, client);
  }

  @SubscribeMessage('connectedClients')
  getConnectedClients() {
    this.server.emit(
      'connectedClients',
      this.chatService.getConnectedClients(),
    );
  }
}
