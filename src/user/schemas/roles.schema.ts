import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class Roles extends Document {
    
}

export const RoleSchema = SchemaFactory.createForClass(Roles)
