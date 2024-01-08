import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RemoteSocket, Socket } from 'socket.io';
import { Model } from 'mongoose';

import { ConnectedClients, Message } from './interfaces';
import { UserKey } from 'src/common/interfaces';
import { Chat } from './schemas';
import { User } from 'src/user/schemas';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { ImagesService } from 'src/common/images/images.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private readonly chatModel: Model<Chat>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @Inject(ImagesService)
    private imagesService: ImagesService,
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
      const result = await this.chatModel.findOneAndDelete({
        sessionId: clientId,
      });
      const _id = result['_id'];
      await this.userModel.findOneAndUpdate(
        { email },
        { $pull: { chat: _id } },
      );
    }

    delete this.connectedClients[clientId];
  }

  findClient(clientId: string): Socket {
    const { client } = this.connectedClients[clientId];
    return client;
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

  async clientChat(message: string, client: string) {
    const chat = await this.manageChat(client, { message, id: client });

    return chat;
  }

  async audioMessage(message: string, client: string) {
    const chat = await this.manageChat(client, {
      message,
      id: client,
      isAudio: true,
    });

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

  async getFullChat(chat: Chat) {
    const chatWithAudios = chat.messages.map(async (data) => {
      if (data.isAudio) {
        const message = await this.imagesService.findOne(data.message);
        return { ...data, message };
      }
      return data;
    });
    return { ...chat, messages: await Promise.all(chatWithAudios) };
  }
}
