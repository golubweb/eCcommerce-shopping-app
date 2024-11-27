
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { CreateUserContactDto } from "../../authorization/dtos/signupUser.dto";
import { ERoles }               from "../../../../../../shared/enums/role.enum";

export class UpdateUserDto {
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

    @IsOptional()
    @IsEnum(ERoles, { each: true })
    role: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsString()
    displayName?: string;

    @IsOptional()
    @IsString()
    avatarUrl?: string;

    @IsNotEmpty()
    contact: CreateUserContactDto
}