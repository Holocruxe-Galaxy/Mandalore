import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Educational, Job, Professional } from './';

@Schema()
export class ProfessionalProfile {
  // @Prop()
  // professional: Professional;
  // @Prop()
  // educational: Educational;
  // @Prop()
  // job: Job;
}
