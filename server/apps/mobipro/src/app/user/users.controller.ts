import { Controller, Post, Get, Param, Patch, Body, UsePipes, ValidationPipe, HttpException, Delete } from "@nestjs/common";

import { UsersService }  from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('users')
export class UsersController {
    constructor(private _usersService: UsersService) {}

    @Post('create')
    @UsePipes(new ValidationPipe())
    async createUser(@Body() _createUserDto: CreateUserDto) {
        return this._usersService.createUser(_createUserDto);
    }
}