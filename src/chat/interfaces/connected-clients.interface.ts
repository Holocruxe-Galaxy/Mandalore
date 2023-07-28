import { Socket } from 'socket.io';
import { UserKey } from 'src/common/interfaces';

interface ClientData extends UserKey {
  client: Socket;
}

export interface ConnectedClients {
  [id: string]: ClientData;
}
