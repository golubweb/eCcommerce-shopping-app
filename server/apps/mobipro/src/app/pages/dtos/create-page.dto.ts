import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, Max, MaxLength, Min, MinLength } from "class-validator";

import { Page } from "../../schemas/pages/pages.schemas";
import { Products } from "../../schemas/products/Products.schema";

export class CreatePageDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(100)
    title: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(30)
    @MaxLength(10000)
    content: string;

    @IsOptional()
    @IsString()
    whoCreated?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString({ each: true })
    tags?: string[];

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsBoolean()
    isCommentsAllowed?: boolean;

    @IsOptional()
    @IsNumber()
    views?: number;

    @IsOptional()
    @IsNumber()
    likes?: number;

    @IsOptional()
    @IsNumber()
    dislikes?: number;

    @IsOptional()
    @IsNumber()
    comments?: number;

    //commentsList: PageComments[];

    //contact: PageImages[];

    //videos?: PageVideos;

    @IsOptional()
    @IsString({ each: true })
    attachments?: string[];

    @IsOptional()
    @IsString({ each: true })
    relatedPages?: Page[];

    //relatedPosts?: Posts[];

    @IsOptional()
    @IsString({ each: true })
    relatedProducts?: Products[];

    //relatedNews?: string[];

    //relatedEvents?: string[];

    //relatedProjects?: string[];

    //relatedJobs?: string[];
}