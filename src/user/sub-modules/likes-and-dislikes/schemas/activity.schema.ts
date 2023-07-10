import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Activity extends Document {
  @Prop()
  name: string;

  @Prop()
  field: string;

  @Prop()
  schedule: string;

  @Prop({ nullable: true })
  companions: string;

  @Prop({ nullable: true })
  additionalData: string;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
