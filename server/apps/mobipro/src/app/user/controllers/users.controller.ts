import { Controller, Post, Get, Param, Patch, Body, UsePipes, ValidationPipe, HttpException, Delete, UseGuards, Put, Req, UseInterceptors, Res } from "@nestjs/common";
import { Request, Response } from 'express';

import { UsersService }  from '../services/users.service';
import { AuthGuardUser } from "../../authorization/guards/auth.guard";

import { ChangePasswordDto } from "../dtos/change-password.dto";
import { ForgotPasswordDto } from "../dtos/forgot-password.dto";
import { ResetPasswordDto }  from "../dtos/reset-password.dto";

import { Roles }  from "../../authorization/decorators/roles.decorator";
import { ERoles } from "../../../../../../shared/enums/role.enum";

import { UpdateUserDto }         from "../dtos/update-user.dto";
import { UsersInterceptor }      from "../interceptors/users.interceptor";
import { UsersErrorInterceptor } from "../interceptors/users.error.interceptor";

import { apiRoutes } from "shared/constants/allowed-origins-urls";

@Controller(apiRoutes.USERS.root)
export class UsersController {
    constructor(private _usersService: UsersService) {}

    @Get(apiRoutes.USERS.findAll)
    @Roles(ERoles.user)
    @UseGuards(AuthGuardUser)
    async fetchUsers() {
        return this._usersService.findAll();
    }

    @Post(apiRoutes.USERS.findOne)
    @Roles(ERoles.user, ERoles.admin)
    @UseGuards(AuthGuardUser)
    async fetchUser(@Body() _userToken: { refreshToken: string }, @Req() _request) {
        return this._usersService.findOne(_request.id, _request.token, _userToken.refreshToken);
    }

    @Put(apiRoutes.USERS.changePassword)
    @UseGuards(AuthGuardUser)
    async changePassword(@Body() _changePassword: ChangePasswordDto, @Req() _request) {
        return this._usersService.changePassword(_request.id, _changePassword);
    }

    @Post(apiRoutes.USERS.forgotPassword)
    async forgotPassword(@Body() _forgotPassword: ForgotPasswordDto) {
        return this._usersService.forgotPassword(_forgotPassword.email);
    }

    @Post(apiRoutes.USERS.resetPassword)
    async resetPassword(@Body() _newCredentials: ResetPasswordDto) {
        return this._usersService.resetPassword(_newCredentials.token, _newCredentials.newPassword);
    }

    @Post(apiRoutes.USERS.updateUser)
    @Roles(ERoles.user)
    @UseGuards(AuthGuardUser)
    //@UseInterceptors(UsersErrorInterceptor) 
    async updateUserData(@Body() _updateUserDto: UpdateUserDto, @Req() _request) {
        return this._usersService.updateUserData(_request.id, _updateUserDto);
    }

    @Delete(apiRoutes.USERS.removeUser)
    @Roles(ERoles.admin)
    @UseGuards(AuthGuardUser)
    async removeUser(@Param('id') _deleteUserID: string, @Req() _request: { id: string, role: ERoles[] }, @Res() _response: Response) {
        return this._usersService.removeUser(_deleteUserID, _request.id, _request.role);
    } 
}