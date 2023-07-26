import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { Chat, ChatSchema } from './schemas';
import { User, UserSchema } from 'src/user/schemas';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Chat.name,
        schema: ChatSchema,
      },
    ]),
    forwardRef(() => AuthModule),
  ],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
