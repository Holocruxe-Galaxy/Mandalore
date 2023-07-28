import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

import { PlanType, RoleType, StatusType } from '../types';
import { ContactInfo, Location, Personal } from '../interfaces';
import { Chat } from 'src/chat/schemas';

@Schema()
export class User extends Document {
  @Prop({ unique: true })
  email: string;

  @Prop({ default: 'PENDING' })
  status: StatusType;

  @Prop({ default: 0 })
  step: number;

  @Prop({ default: 'USER' })
  role: RoleType;

  @Prop({ default: 'FREE' })
  plan: PlanType;

  @Prop({ type: SchemaTypes.Mixed })
  contactInfo: ContactInfo;

  @Prop({
    type: SchemaTypes.Mixed,
  })
  location: Location;

  @Prop({
    type: SchemaTypes.Mixed,
  })
  personal: Personal;

  @Prop({
    type: SchemaTypes.ObjectId,
  })
  chat: Chat[];
}

export const UserSchema = SchemaFactory.createForClass(User);
