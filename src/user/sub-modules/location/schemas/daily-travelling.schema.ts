import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class DailyTravelling extends Document {
  @Prop()
  frequency: string;

  @Prop()
  destiny: string;

  @Prop()
  departure: string;

  @Prop()
  arrival: string;
}

export const DailyTravellingSchema =
  SchemaFactory.createForClass(DailyTravelling);
