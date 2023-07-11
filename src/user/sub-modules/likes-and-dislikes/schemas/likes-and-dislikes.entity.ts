import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Activity, Interest } from '.';

@Schema()
export class LikesAndDislikes extends Document {
  // @Prop()
  // activity: Activity[];
  // @Prop()
  // interest: Interest[];
}
