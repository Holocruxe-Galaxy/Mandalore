import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Institution, ProfessionalProfile } from '.';

@Schema()
export class Educational {
  // @Prop()
  // professionalProfile: ProfessionalProfile;
  // @Prop()
  // school: Institution;
  // @Prop()
  // course: Institution;
}
