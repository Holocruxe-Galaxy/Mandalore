import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Educational, Job, Professional } from './';

@Schema()
export class Institution {
  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  startingDate: string;

  @Prop()
  finishingDate: string;

  @Prop()
  educational: Educational;

  // @Prop()
  // job: Educational;

  // @Prop()
  // professional: Professional;
}
