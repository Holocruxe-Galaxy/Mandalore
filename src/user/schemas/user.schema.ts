import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

import { StatusType } from '../types';
import {
  ContactInfo,
  GeneralInterests,
  Location,
  Personal,
  Professional,
} from '../interfaces';
import { Chat } from 'src/chat/schemas';

@Schema()
export class User extends Document {
  @Prop({ unique: true })
  email: string;

  @Prop({ default: 'PENDING' })
  status: StatusType;

  @Prop({ default: 0 })
  step: number;

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
    type: SchemaTypes.Mixed,
  })
  professional: Professional;

  @Prop({
    type: SchemaTypes.Mixed,
  })
  generalInterests: GeneralInterests;

  @Prop()
  chat: Chat[];
}

export const UserSchema = SchemaFactory.createForClass(User);
