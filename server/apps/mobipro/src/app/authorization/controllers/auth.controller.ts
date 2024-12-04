import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";

import { AuthService }  from "../services/auth.service";
import { Roles }        from "../decorators/roles.decorator";

import { LoginUserDto }    from "../dtos/login.dto";
import { CreateUserDto }   from '../dtos/signupUser.dto';
import { RefreshTokenDto } from "../dtos/refresh-token.dto";
import { apiRoutes }       from "../../../../../../shared/constants/allowed-origins-urls";
import { ERoles }          from "../../../../../../shared/enums/role.enum";
import { AuthGuardUser }   from "../guards/auth.guard";

@Controller(apiRoutes.AUTH.root)
export class AuthController {
    constructor(private _authService: AuthService) {}

    @Post(apiRoutes.AUTH.login)
    async loginUser(@Body() _loginUserDto: LoginUserDto) {
        return this._authService.loginUser(_loginUserDto);
    }

    @Post(apiRoutes.AUTH.signup)
    async signupUser(@Body() _createUserDto: CreateUserDto) {
        return this._authService.createUser(_createUserDto);
    }

    @Post(apiRoutes.AUTH.logout)
    @Roles(ERoles.user, ERoles.admin)
    @UseGuards(AuthGuardUser)
    async logoutUser(@Body() _userToken: { refreshToken: string }, @Req() _request) {
        return this._authService.logoutUser(_request.id, _userToken.refreshToken);
    }

    @Post(apiRoutes.AUTH.refreshToken)
    async refreshToken(@Body() _refreshTokenDto: RefreshTokenDto) {
        return this._authService.refreshToken(_refreshTokenDto);
    }
}