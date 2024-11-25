import { Body, Controller, Post } from "@nestjs/common";

import { AuthService }  from "../services/auth.service";

import { LoginUserDto }    from "../dtos/login.dto";
import { CreateUserDto }   from '../dtos/signupUser.dto';
import { RefreshTokenDto } from "../dtos/refresh-token.dto";

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

    @Post('refresh-token')
    async refreshToken(@Body() _refreshTokenDto: RefreshTokenDto) {
        return this._authService.refreshToken(_refreshTokenDto);
    }
}