import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { Message } from './dto/message.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ConnectedClients } from './interfaces/connected-clients.interface';

@Injectable()
export class ChatService {
  private readonly connectedClients: ConnectedClients = {};
  @WebSocketServer() private readonly server: Server;

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
    return this.server.emit('broadcast', message);
  }

  create(message: Message) {
    return 'This action adds a new chat';
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
