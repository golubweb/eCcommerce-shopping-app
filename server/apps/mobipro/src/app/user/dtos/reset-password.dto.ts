import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

import { ValidationRegister } from "../../../../../../shared/middleware/register/validation.register";
import { registerMessages }   from "../../../../../../shared/middleware/register/validator-messages";
import { IsNotEqualTo }      from "../../../../../../shared/middleware/decorators/not-match.password.decorator";

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsString()
    token: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @IsNotEqualTo('oldPassword', { message: registerMessages.passwordNotEqual })
    @Matches(ValidationRegister.password, { message: registerMessages.password })
    newPassword: string;
}