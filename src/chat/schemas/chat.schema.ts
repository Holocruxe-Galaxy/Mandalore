import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Chat extends Document {
  @Prop()
  messages: string[];

  @Prop()
  sessionId: string;

  @Prop({ default: false })
  seen: boolean;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
