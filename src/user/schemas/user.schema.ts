import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import {
  ContactInfo,
  Group,
  LikesAndDislikes,
  Location,
  Personal,
  ProfessionalProfile,
} from '.';
import { PlanType, RoleType, StatusType } from '../types';

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

  @Prop({
    type: { type: SchemaTypes.ObjectId, ref: 'contactInfo' },
  })
  contactInfo: ContactInfo;

  // @Prop({
  //   type: [{ type: SchemaTypes.ObjectId, ref: Group.name }],
  // })
  // group: [Group];

  // @Prop({
  //   type: [{ type: SchemaTypes.ObjectId, ref: 'likesAndDislikes' }],
  // })
  // likesAndDislikes: [LikesAndDislikes];

  @Prop({
    type: [{ type: SchemaTypes.ObjectId, ref: 'Location' }],
  })
  location: [Location];

  @Prop({
    type: { type: SchemaTypes.ObjectId, ref: 'personal' },
  })
  personal: Personal;

  // @Prop({
  //   type: [{ type: SchemaTypes, ref: 'professionalProfile' }],
  // })
  // professionalProfile: ProfessionalProfile;
}

export const UserSchema = SchemaFactory.createForClass(User);
