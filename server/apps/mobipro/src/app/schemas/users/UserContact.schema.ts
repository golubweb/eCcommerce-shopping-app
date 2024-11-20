import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class UserContact extends Document {
    @Prop({ required: true })
    primary_address: string;

    @Prop({ required: false, default: null })
    secondary_address?: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: false, default: null })
    state?: string;

    @Prop({ required: false, default: null })
    zip?: string;

    @Prop({ required: true })
    country: string;

    @Prop({ required: false, default: null })
    phone?: string;

    @Prop({ required: true })
    mobile: string;

    @Prop({ required: false, default: null })
    fax?: string;
}

export const UserContactSchema = SchemaFactory.createForClass(UserContact);