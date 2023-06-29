import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Institution, ProfessionalProfile } from './';

@Schema()
export class Professional {
  // @Prop()
  // professionalProfile: ProfessionalProfile;
  // @Prop()
  // internship: Institution;
  // @Prop()
  // softSkills: string[];
  // @Prop()
  // hardSkills: string[];
}
