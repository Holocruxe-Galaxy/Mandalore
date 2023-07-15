import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Diary extends Document {
  @Prop()
  user: string;

  @Prop({ nullable: false })
  content: string;

  @Prop()
  emoji: string;

  @Prop({ default: false })
  favorite: boolean;

  @Prop()
  deletedAt: Date;
}

export const DiarySchema = SchemaFactory.createForClass(Diary);
