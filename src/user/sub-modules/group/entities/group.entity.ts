import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { People } from '../interfaces';

@Schema()
export class Group extends Document {
  @Prop()
  name: string;

  @Prop()
  people: People[];
}
