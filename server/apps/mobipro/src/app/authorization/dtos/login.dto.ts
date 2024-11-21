import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

import { ValidationRegister } from "../../../../../../shared/middleware/register/validation.register";
import { registerMessages }   from "../../../../../../shared/middleware/register/validator-messages";

export class LoginUserDto {
    @IsNotEmpty()
    @Matches(ValidationRegister.email, { message: registerMessages.email })
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}