import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import {
  ContactInfo,
  Group,
  LikesAndDislikes,
  Personal,
  ProfessionalProfile,
} from './';
import { StatusType } from '../types';
import { prop } from '@typegoose/typegoose';

@Schema()
export class User {
  @prop({ unique: true })
  email: string;

  @prop({ default: 'PENDING' })
  status: StatusType;

  @prop({
    type: [{ type: SchemaTypes.ObjectId, ref: 'contactInfo' }],
  })
  contactInfo: ContactInfo;

  @prop({
    type: [{ type: SchemaTypes.ObjectId, ref: 'group' }],
  })
  group: [Group];

  @prop({
    type: [{ type: SchemaTypes.ObjectId, ref: 'personal' }],
  })
  personal: Personal;

  @prop({
    type: [{ type: SchemaTypes, ref: 'professionalProfile' }],
  })
  professionalProfile: ProfessionalProfile;

  @prop({
    type: [{ type: SchemaTypes.ObjectId, ref: 'likesAndDislikes' }],
  })
  likesAndDislikes: [LikesAndDislikes];
}

export const UserSchema = SchemaFactory.createForClass(User);
