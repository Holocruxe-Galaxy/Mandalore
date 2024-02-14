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
      connectedClient.emit('broadcast', await this.chatService.getChat(chat));
    }
  }

  @SubscribeMessage('clientChat')
  async clientChat(
    @MessageBody(new ParseSocketContent()) createMessageDto: CreateMessageDto,
    id: string,
  ) {
    //me traigo el cliente de socket con el respectivo id que recibo por query ejemplo: RO8IZLuKqkM1NdYhAAAB
    const client = this.chatService.findClient(id);

    //Se trae el email a partir del toquen para después buscar el chat asociado a ese email
    const token = client.handshake.headers.authorization;
    const email: UserKey = await this.authService.isUser(token);

    const chat = await this.chatService.clientChat(
      createMessageDto.message,
      email.email,
      id,
    );
    client.emit('clientChat', chat);
  }

  async sendAudio(id: string, audio: string) {
    const client = this.chatService.findClient(id);
    const chat = await this.chatService.audioMessage(audio, id);

    client.emit('audio', await this.chatService.getChat(chat));
  }

  @SubscribeMessage('connectedClients')
  getConnectedClients(@ConnectedSocket() client: Socket) {
    client.emit('connectedClients', this.chatService.getConnectedClients());
  }
}
