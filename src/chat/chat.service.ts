import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RemoteSocket, Socket } from 'socket.io';
import { Model } from 'mongoose';

import { ConnectedClients, Message } from './interfaces';
import { UserKey } from 'src/common/interfaces';
import { Chat } from './schemas';
import { User } from 'src/user/schemas';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private readonly chatModel: Model<Chat>,

    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}
  private readonly connectedClients: ConnectedClients = {};

  async registerClient(client: Socket, email: UserKey) {
    this.connectedClients[client.id] = { ...email, client };

    const chat = await this.chatModel.create({ sessionId: client.id });

    await this.userModel.findOneAndUpdate(email, { $push: { chat } });
  }

  async removeClient(clientId: string) {
    const chatSession = await this.chatModel.findOne({ sessionId: clientId });

    if (!chatSession?.messages?.length) {
      const email = this.connectedClients[clientId].email;
      const { _id } = await this.chatModel.findOneAndDelete({
        sessionId: clientId,
      });
      await this.userModel.findOneAndUpdate(
        { email },
        { $pull: { chat: _id } },
      );
    }

    delete this.connectedClients[clientId];
  }

  getConnectedClients() {
    return Object.keys(this.connectedClients).length;
  }

  async broadcast(
    message: string,
    client: RemoteSocket<DefaultEventsMap, any>,
  ) {
    const chat = await this.manageChat(client.id, {
      message,
      isBroadcasted: true,
    });

    return chat;
  }

  async clientChat(message: string, client: Socket) {
    const chat = await this.manageChat(client.id, { message, id: client.id });

    return chat;
  }

  async manageChat(sessionId: string, message: Message): Promise<Chat> {
    return await this.chatModel.findOneAndUpdate(
      { sessionId },
      {
        $push: { messages: message },
      },
      { new: true },
    );
  }
}
