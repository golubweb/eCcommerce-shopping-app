import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

import { ERole } from '../../../../../shared/enums/role.enum';

@Schema({
    timestamps: true
})
export class User extends mongoose.Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    lastname: string;

    //@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }) contact?: Contact;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: false })
    isActive: boolean;

    @Prop({ required: false })                                                    
    displayName?: string;

    @Prop({ required: false })                                                    
    avatarUrl?: string;

    @Prop({ type: [{ type: String, enum: ERole }], default: [ ERole.user ] }) 
    role:  ERole[];
}

export const UserSchema = SchemaFactory.createForClass(User);