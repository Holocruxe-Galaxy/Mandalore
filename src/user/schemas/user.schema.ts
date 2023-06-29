import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import {
  ContactInfo,
  Group,
  LikesAndDislikes,
  Personal,
  ProfessionalProfile,
} from '.';
import { StatusType } from '../types';

@Schema()
export class User extends Document {
  @Prop({ unique: true })
  email: string;

  @Prop({ default: 'PENDING' })
  status: StatusType;

  // @Prop({
  //   type: [{ type: SchemaTypes.ObjectId, ref: ContactInfo.name }],
  // })
  // contactInfo: ContactInfo;

  // @Prop({
  //   type: [{ type: SchemaTypes.ObjectId, ref: Group.name }],
  // })
  // group: [Group];

  @Prop({
    type: [{ type: SchemaTypes.ObjectId, ref: 'personal' }],
  })
  personal: Personal;

  // @Prop({
  //   type: [{ type: SchemaTypes, ref: 'professionalProfile' }],
  // })
  // professionalProfile: ProfessionalProfile;

  // @Prop({
  //   type: [{ type: SchemaTypes.ObjectId, ref: 'likesAndDislikes' }],
  // })
  // likesAndDislikes: [LikesAndDislikes];
}

export const UserSchema = SchemaFactory.createForClass(User);
