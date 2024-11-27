import { Controller, Post, Get, Param, Patch, Body, UsePipes, ValidationPipe, HttpException, Delete, UseGuards, Put, Req, UseInterceptors } from "@nestjs/common";

import { UsersService }  from '../services/users.service';
import { AuthGuardUser } from "../../guards/auth.guard";

import { ChangePasswordDto } from "../dtos/change-password.dto";
import { ForgotPasswordDto } from "../dtos/forgot-password.dto";
import { ResetPasswordDto }  from "../dtos/reset-password.dto";

import { Roles }  from "../../authorization/decorators/roles.decorator";
import { ERoles } from "../../../../../../shared/enums/role.enum";

import { UpdateUserDto }     from "../dtos/update-user.dto";
import { UsersInterceptors } from "../interceptors/users.interceptors";

@Controller('users')
export class UsersController {
    constructor(private _usersService: UsersService) {}

    @Get('findAll')
    @Roles(ERoles.user)
    @UseGuards(AuthGuardUser)
    async fetchUsers() {
        return this._usersService.findAll();
    }

    @Put('change-password')
    @UseGuards(AuthGuardUser)
    async changePassword(@Body() _changePassword: ChangePasswordDto, @Req() _request) {
        return this._usersService.changePassword(_request.id, _changePassword);
    }

    @Post('forgot-password')
    async forgotPassword(@Body() _forgotPassword: ForgotPasswordDto) {
        return this._usersService.forgotPassword(_forgotPassword.email);
    }

    @Post('reset-password')
    async resetPassword(@Body() _newCredentials: ResetPasswordDto) {
        return this._usersService.resetPassword(_newCredentials.token, _newCredentials.newPassword);
    }

    @Post('update')
    @Roles(ERoles.user)
    @UseGuards(AuthGuardUser)
    @UseInterceptors(UsersInterceptors)
    async updateUserData(@Body() _updateUserDto: UpdateUserDto, @Req() _request) {
        return this._usersService.updateUserData(_request.id, _updateUserDto);
    }
}