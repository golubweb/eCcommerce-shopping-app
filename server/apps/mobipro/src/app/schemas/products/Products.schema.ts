import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({
    timestamps: true
})
export class Products extends mongoose.Document {
    @Prop({ default: true })
    isActive: boolean;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    mainDescription: string;

    @Prop({ default: null })
    secoundDescription?: string;

    @Prop({ required: true })
    price: number;

    @Prop({ default: null })
    thumbImageURL?: string;

    @Prop({ default: null })
    imagesURL?: string[];

    @Prop({ default: 0 })
    stock?: number;

    @Prop({ default: false })
    reviews?: number;

    @Prop({ default: null })
    category?: string[];

    @Prop({ default: null })
    brand?: string;

    @Prop({ default: false })
    onDiscount?: boolean;

    @Prop({ default: false })
    isPopular?: boolean;

    @Prop({ default: true })
    isNewProduct: boolean;

    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    whoCreated?: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);