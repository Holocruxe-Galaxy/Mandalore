import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Institution, ProfessionalProfile } from '.';

@Schema()
export class Job {
  // @Prop()
  // professionalProfile: ProfessionalProfile;
  // @Prop()
  // previousJob: Institution;
  // @Prop()
  // currentJob: Institution;
}
