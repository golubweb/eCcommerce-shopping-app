import { Controller, Post, Get, Param, Patch, Body, UsePipes, ValidationPipe, HttpException, Delete } from "@nestjs/common";

import { UsersService }  from './users.service';
import { CreateUserDto } from '../authorization/dtos/signupUser.dto';

@Controller('users')
export class UsersController {
    constructor(private _usersService: UsersService) {}
}