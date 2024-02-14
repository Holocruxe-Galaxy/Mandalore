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

    //Ahora en vez de pushear un nuevo chat cada vez que se conecta al chat
    //simplemente se comprueba si existe un chat asociado con el Email
    //y si no existe se crea
    const chat = await this.chatModel.findOne({
      userEmail: email.email,
    });
    if (!chat) {
      await this.chatModel.create({
        id: client.id,
        userEmail: email.email,
      });
    }
  }

  async removeClient(clientId: string) {
    //Ahora en vez de modificar el chat cuando se desconecta, simplemente se cierra la sesión de socket
    //en el futuro quiza sea ideal modificar el documento del chat cuando se desconecte
    //agregándole la propiedad de horario de última vez que estuvo conectado
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
    let date = new Date();
    const chat = await this.manageChat(client.id, {
      message,
      isBroadcasted: true,
      date,
    });

    return chat;
  }
  //En vez de mandarlo a la función manage chat, hago los cambios directamente en ésta función
  async clientChat(message: string, email: string, id?: string) {
    //Busco el chat asociado con el email
    const { messages } = await this.chatModel.findOne({ userEmail: email });
    //Creo el mensaje según el interface de Message
    let messageTransform: Message = {
      message,
      date: new Date(),
      id,
    } as Message;

    //Compruebo si tiene algo para no generar un error
    //y no romper el código con la función array.concat en caso de que no exista el array
    if (messages && messages.length) {
      let messageConcat: Message[] = messages.concat(messageTransform);
      return await this.chatModel.findOneAndUpdate(
        { userEmail: email },
        { messages: messageConcat },
        { new: true },
      );
    } else {
      return await this.chatModel.findOneAndUpdate(
        { userEmail: email },
        { messages: [messageTransform] },
        { new: true },
      );
    }
  }

  async audioMessage(message: string, clientId: string) {
    const email = this.connectedClients[clientId].email;

    const { messages } = await this.chatModel.findOne({ userEmail: email });
    let messageTransform: Message = {
      message,
      date: new Date(),
      id: clientId,
      isAudio: true,
    } as Message;

    //Compruebo si tiene algo para no generar un error y no romper el código con el .concat si la propiedad messages es null
    if (messages && messages.length) {
      //se concatena el nuevo mensaje al antiguo array
      let messageConcat: Message[] = messages.concat(messageTransform);
      return await this.chatModel.findOneAndUpdate(
        { userEmail: email },
        { messages: messageConcat },
        { new: true },
      );
    } else {
      //Si messages es null, para no romper el código con un .concat
      //se crea un arreglo con el nuevo mensaje dentro
      return await this.chatModel.findOneAndUpdate(
        { userEmail: email },
        { messages: [messageTransform] },
        { new: true },
      );
    }
  }

  async manageChat(id: string, message: Message): Promise<Chat> {
    return await this.chatModel.findOneAndUpdate(
      { id },
      {
        $push: { messages: message },
      },
      { new: true },
    );
  }

  async getChat(chat: Chat) {
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
