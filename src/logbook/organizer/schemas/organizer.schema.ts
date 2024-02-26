import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Finances, Note, Task } from '../interfaces';

@Schema({ timestamps: true })
export class Organizer extends Document {
  @Prop({ nullable: false })
  userId: string;

  @Prop({ type: SchemaTypes.Mixed })
  notes: Note[];

  @Prop({ type: SchemaTypes.Mixed })
  tasks: Task[];

  @Prop({ type: SchemaTypes.Mixed })
  finances: Finances[];
}

export const OrganizerSchema = SchemaFactory.createForClass(Organizer);
