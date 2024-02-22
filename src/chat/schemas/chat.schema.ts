import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Message } from '../interfaces';

@Schema({ timestamps: true })
export class Chat extends Document {
  @Prop({ type: SchemaTypes.Mixed })
  messages: Message[];

  @Prop()
  userId: string;

  @Prop()
  sessionId: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
