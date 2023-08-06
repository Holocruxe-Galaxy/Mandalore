import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

import { Note } from '../interfaces/note.interface';
import { Task } from '../interfaces/tasks.interface';

@Schema({ timestamps: true })
export class Organizer extends Document {
  @Prop({ nullable: false })
  user: string;

  @Prop({ type: SchemaTypes.Mixed })
  notes: Note[];

  @Prop()
  tasks: Task[];
}

export const OrganizerSchema = SchemaFactory.createForClass(Organizer);
