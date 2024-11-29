import { IsBoolean, IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength } from "class-validator";

export class CreateProductDto {
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsNotEmpty()
    @IsString()
    @MaxLength(90)
    name: string;

    @IsNotEmpty()
    @MaxLength(600)
    @Matches(/<\/?[a-z][\s\S]*>/i, { message: 'mainDescription must include HTML tags' })
    mainDescription: string;

    @IsOptional()
    @MaxLength(300)
    secoundDescription?: string;

    @IsNotEmpty()
    @Matches(/^\d+(\.\d{1,2})?$/, { message: 'price must be a valid decimal number with up to two decimal places' })
    price: string;

    @IsOptional()
    @IsString()
    @Matches(/\.(jpg|png)$/, { each: true, message: 'Each image URL must end with .jpg or .png' })
    thumbImageURL?: string;

    @IsOptional()
    @IsString({ each: true })
    @Matches(/\.(jpg|png)$/, { each: true, message: 'Each image URL must end with .jpg or .png' })
    imagesURL?: string[];

    @IsOptional()
    @IsNumber()
    @IsInt()
    stock?: number;

    @IsOptional()
    @IsBoolean()
    @IsInt()
    reviews?: number;

    @IsOptional()
    @IsString()
    category?: string[];

    @IsOptional()
    @IsString()
    brand?: string;

    @IsOptional()
    @IsString()
    whoCreated?: string;
}

/*{
    "name":            "Iphone 4",
    "mainDescription": "Telefon sa veoma pouzdom batrerijom, velicene 4500mlAh, sa 4GB RAM-a, i 64GB memorije.",
    "price":           "100",
    "category":        "Mogile"
    "brand":           "Iphone",
    "imagesURL":       "C:\\git\\golubweb\\eCcommerce-shopping-app\\mockup\\images\\products\\iphone4.png",
    "isNew":           "true",
    "isPopular":       "true",
    "onDiscount":      "false",
    "reviews":         "0", //optional
    "secoundDescription": "Veoma pouzdan telefon, po veoma niskoj ceni", //optional
    "stock":           "10", //optional
    "thumbImageURL":   "C:\\git\\golubweb\\eCcommerce-shopping-app\\mockup\\images\\products\\iphone4.png", //optional
    "whoCreated":      string;
}*/