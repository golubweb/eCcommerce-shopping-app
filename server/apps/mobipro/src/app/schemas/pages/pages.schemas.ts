import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Products } from "../products/Products.schema";

@Schema({
    timestamps: true
})
export class Page extends mongoose.Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    whoCreated: string;

    @Prop({ required: false })
    category?: string;

    @Prop({ required: false, default: [] })
    tags: string[];

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ required: false, default: true })
    isCommentsAllowed?: boolean;

    @Prop({ required: false, default: 0 })
    views: number;

    @Prop({ required: false, default: 0 })
    likes?: number;

    @Prop({ required: false, default: 0 })
    dislikes?: number;

    @Prop({ required: false, default: 0 })
    comments?: number;

    //@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PageComments' }] })
    //commentsList: PageComments[];

    //@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PageImages' }] })
    //contact: PageImages[];

    //@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PageVideos' }] })
    //videos?: PageVideos;

    @Prop({ required: false })
    attachments?: string[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Page' }] })  
    relatedPages?: Page[];

    //@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }] })
    //relatedPosts?: Posts[];
    
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }] })
    relatedProducts?: Products[];

    //@Prop({ required: false })
    //relatedNews?: string[];

    //@Prop({ required: false })
    //relatedEvents?: string[];

    //@Prop({ required: false })
    //relatedProjects?: string[];

    //@Prop({ required: false })
    //relatedJobs?: string[];
}

export const PageSchema = SchemaFactory.createForClass(Page);