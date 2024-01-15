import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Account extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  role: string;
}

const AccountSchema = SchemaFactory.createForClass(Account);

export const AccountMongooseModule = MongooseModule.forFeature([
  {
    name: Account.name,
    schema: AccountSchema,
  },
]);
