import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ERoles } from "shared/enums/role.enum";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
    password: string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    //@Matches('password', 'passwords do not match')
    confermaPassword: string;

    @IsOptional()
    @IsEnum(ERoles, { each: true })
    role: string;

    @IsOptional()
    @IsBoolean()
    isActive: boolean;

    @IsOptional()
    @IsString()
    displayName?: string;

    @IsOptional()
    @IsString()
    avatarUrl?: string;
}

/*{
"name": "Dejan",
"lastname": "Petrovic",
"email": "d.petrovic@gmail.com",
"password": "Dobar!pass245$",
"confermaPassword": "Dobar!pass245$",
"displayName": "DekiFlesh",
"avatarUrl": "url/images/1.jpg",
}*/