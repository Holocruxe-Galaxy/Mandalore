import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

import { Message } from './dto/message.dto';
import { ConnectedClients } from './interfaces/connected-clients.interface';

@Injectable()
export class ChatService {
  private readonly connectedClients: ConnectedClients = {};

  registerClient(client: Socket) {
    this.connectedClients[client.id] = client;
  }

  removeClient(clientId: string) {
    delete this.connectedClients[clientId];
  }

  getConnectedClients() {
    return Object.keys(this.connectedClients).length;
  }

  broadcast(message: Message) {
    return message;
  }

  clientChat(message: Message) {
    return message;
  }
}
