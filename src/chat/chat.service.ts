import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

import { ConnectedClients } from './interfaces';
import { Message } from './dto';
import { UserKey } from 'src/common/interfaces';

@Injectable()
export class ChatService {
  private readonly connectedClients: ConnectedClients = {};

  registerClient(client: Socket, email: UserKey) {
    this.connectedClients[client.id] = { ...email, client };
  }

  removeClient(clientId: string) {
    delete this.connectedClients[clientId];
  }

  getConnectedClients() {
    return Object.keys(this.connectedClients).length;
  }

  broadcast(message: Message, client: Socket) {
    // console.log(client);
    return message;
  }

  clientChat(message: Message, client: Socket) {
    return message;
  }
}
