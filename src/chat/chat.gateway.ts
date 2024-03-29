import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Inject, forwardRef } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto';

import { ParseSocketContent } from './pipes';
import { AuthService } from 'src/auth/auth.service';
import { UserKey } from 'src/common/interfaces';
import { ImagesService } from 'src/common/images/images.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatService: ChatService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @Inject(ImagesService)
    private imagesService: ImagesService,
  ) {}
  @WebSocketServer() server: Server;

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.headers.authorization;
      const email: UserKey = await this.authService.isUser(token);

      this.chatService.registerClient(client, email);

      client.emit('connection', { id: client.id });
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
  ) {
    const connectedClients = await this.server.fetchSockets();

    for (const connectedClient of connectedClients) {
      const chat = await this.chatService.broadcast(
        createMessageDto.message,
        connectedClient,
      );
      connectedClient.emit(
        'broadcast',
        await this.chatService.getFullChat(chat),
      );
    }
  }

  @SubscribeMessage('clientChat')
  async clientChat(
    @MessageBody(new ParseSocketContent()) createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const chat = await this.chatService.clientChat(
      createMessageDto.message,
      client.id,
    );
    client.emit('clientChat', await this.chatService.getFullChat(chat));
  }

  async sendAudio(id: string, audio: string) {
    const client = this.chatService.findClient(id);
    const chat = await this.chatService.audioMessage(audio, client.id);
    client.emit('audio', await this.chatService.getFullChat(chat));
  }

  @SubscribeMessage('connectedClients')
  getConnectedClients(@ConnectedSocket() client: Socket) {
    client.emit('connectedClients', this.chatService.getConnectedClients());
  }
}
