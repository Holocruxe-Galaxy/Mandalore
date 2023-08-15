import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Diary extends Document {
  @Prop({ nullable: false })
  user: string;

  @Prop({ nullable: false })
  content: string;

  @Prop()
  emoji: string;

  @Prop()
  photo: string;

  @Prop({ default: false })
  favorite: boolean;

  @Prop()
  deletedAt: Date;
}

export const DiarySchema = SchemaFactory.createForClass(Diary);
