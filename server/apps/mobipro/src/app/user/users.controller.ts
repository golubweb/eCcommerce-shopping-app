import { Controller, Post, Get, Param, Patch, Body, UsePipes, ValidationPipe, HttpException, Delete, UseGuards } from "@nestjs/common";

import { UsersService }  from './users.service';
import { CreateUserDto } from '../authorization/dtos/signupUser.dto';
import { AuthGuardUser } from "../guards/auth.guard";

@Controller('users')
export class UsersController {
    constructor(private _usersService: UsersService) {}

    @Get('findAll')
    @UseGuards(AuthGuardUser)
    async fetchUsers() {
        return this._usersService.findAll();
    }
}