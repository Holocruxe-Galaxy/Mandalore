import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { User } from 'src/user/schemas';

@Schema()
export class Notification extends Document {
  @Prop({ default: true })
  app: boolean;

  @Prop({ default: true })
  email: boolean;

  @Prop({
    type: SchemaTypes.ObjectId,
  })
  user: User;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
