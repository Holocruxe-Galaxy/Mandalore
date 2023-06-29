import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ContactInfo extends Document {
  @Prop()
  email: string;

  @Prop()
  altEmail: string;

  @Prop()
  phone: string;

  @Prop()
  zipCode: string;
}

export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo);
