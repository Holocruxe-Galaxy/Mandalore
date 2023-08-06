import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Note, Task } from '../interfaces';

@Schema({ timestamps: true })
export class Organizer extends Document {
  @Prop({ nullable: false })
  user: string;

  @Prop({ type: SchemaTypes.Mixed })
  notes: Note[];

  @Prop({ type: SchemaTypes.Mixed })
  tasks: Task[];
}

export const OrganizerSchema = SchemaFactory.createForClass(Organizer);
