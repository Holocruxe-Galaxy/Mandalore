import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Personal extends Document {
  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  gender: string;

  @Prop()
  birthdate: string;

  @Prop()
  civilStatus: string;
}

export const PersonalSchema = SchemaFactory.createForClass(Personal);
