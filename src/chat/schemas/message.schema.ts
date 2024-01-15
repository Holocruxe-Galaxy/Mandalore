import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop()
  sender: ObjectId;

  @Prop()
  message: string;

  @Prop()
  seen?: boolean;

  @Prop()
  isAudio?: boolean;

  @Prop()
  isBroadcasted?: boolean;

  @Prop()
  sessionId: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
