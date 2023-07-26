import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Socket } from 'socket.io';

import { ConnectedClients } from './interfaces';
import { Message } from './dto';
import { UserKey } from 'src/common/interfaces';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChatService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}
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
    const email = this.connectedClients[client.id].email;

    // this.userService.stepFollower.

    return message;
  }

  clientChat(message: Message, client: Socket) {
    return message;
  }
}
