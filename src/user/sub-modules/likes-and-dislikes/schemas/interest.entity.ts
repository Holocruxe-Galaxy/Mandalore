import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LikesAndDislikes } from '.';

@Schema()
export class Interest {
  @Prop()
  name: string;

  @Prop()
  field: string;

  @Prop()
  schedule: string;

  @Prop()
  genre: string;

  @Prop()
  units: string[];

  // @Prop()
  // likesAndDislikes: LikesAndDislikes;
}
