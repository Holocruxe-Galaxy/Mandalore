import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Inject, UseGuards, forwardRef } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto';

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
  async broadCast(
    @MessageBody(new ParseSocketContent()) createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.server.emit(
      'broadcast',
      await this.chatService.broadcast(createMessageDto.message, client),
    );
  }

  @SubscribeMessage('clientChat')
  async clientChat(
    @MessageBody(new ParseSocketContent()) createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    client.emit(
      'clientChat',
      await this.chatService.clientChat(createMessageDto.message, client),
    );
  }

  @SubscribeMessage('connectedClients')
  getConnectedClients(@ConnectedSocket() client: Socket) {
    client.emit('connectedClients', this.chatService.getConnectedClients());
  }
}
