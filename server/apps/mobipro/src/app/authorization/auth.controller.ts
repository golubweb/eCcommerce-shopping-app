import { Body, Controller, Post } from "@nestjs/common";

import { AuthService }  from "./auth.service";

import { LoginUserDto }  from "./dto/login.dto";
import { CreateUserDto } from './dto/signupUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private _authService: AuthService) {}

    @Post('login')
    async loginUser(@Body() _loginUserDto: LoginUserDto) {
        return this._authService.loginUser(_loginUserDto);
    }

    @Post('signup')
    async signupUser(@Body() _createUserDto: CreateUserDto) {
        return this._authService.createUser(_createUserDto);
    }

    @Post('logout')
    async logoutUser(@Body() _signupUserDto: any) {
        return 'Logout user';
    }
}