import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Notification extends Document {
  @Prop({ default: true })
  app: boolean;

  @Prop({ default: true })
  email: boolean;

  @Prop({ required: true })
  userId: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
