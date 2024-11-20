import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";
import { IsEqualTo } from "../../../../../../shared/middleware/match.password.decorator";
import { ERoles }    from "shared/enums/role.enum";

export class CreateUserContactDto {
    @IsNotEmpty()
    @IsString()
    primary_address: string;

    @IsOptional()
    @IsString()
    secondary_address?: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsOptional()
    @IsString()
    state?: string;

    @IsOptional()
    @IsString()
    zip?: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsNotEmpty()
    @IsString()
    mobile: string;
    
    @IsOptional()
    @IsString()
    fax?: string;
}

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
    @IsEqualTo<CreateUserDto>('password', { message: 'Passwords do not match' })
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

    @IsNotEmpty()
    contact: CreateUserContactDto
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