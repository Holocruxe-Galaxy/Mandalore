import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { DailyTravelling } from './daily-travelling.schema';

@Schema()
export class Location extends Document {
  @Prop()
  country: string;

  @Prop()
  provinceOrState: string;

  @Prop()
  city: string;

  @Prop()
  address: string;

  @Prop({
    type: { type: SchemaTypes.ObjectId, ref: 'dailyTravelling' },
  })
  dailyTravelling: DailyTravelling;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
