import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

import { ERoles }      from '../../../../../../shared/enums/role.enum';
import { UserContact } from "./UserContact.schema";

@Schema({
    timestamps: true
})
export class User extends mongoose.Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    lastname: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: false })
    isActive: boolean;

    @Prop({ required: false })                                                    
    displayName?: string;

    @Prop({ required: false })                                                    
    avatarUrl?: string;

    @Prop({ type: [{ type: String, enum: ERoles }], default: [ ERoles.user ] }) 
    role:  ERoles[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserContact' }) 
    contact: UserContact;
}

export const UserSchema = SchemaFactory.createForClass(User);