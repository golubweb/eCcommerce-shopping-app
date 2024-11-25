import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";


@Schema({
    timestamps: true
})
export class ResetPaswordToken extends mongoose.Document {
    @Prop({ required: true })
    token: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: string;

    @Prop({ required: true })
    expiryDate: Date;
}

export const ResetPasswordTokenSchema = SchemaFactory.createForClass(ResetPaswordToken);