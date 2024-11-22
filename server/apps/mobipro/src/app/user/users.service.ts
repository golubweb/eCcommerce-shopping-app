import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel }               from '@nestjs/mongoose';
import { JwtService }                from "@nestjs/jwt";
import { Model }                     from 'mongoose';

import { CreateUserDto } from '../authorization/dtos/signupUser.dto';
import { User }          from '../schemas/users/User.schema';

@Injectable()
export class UsersService {
    constructor(
        private _jwtService: JwtService,
        @InjectModel(User.name) private _userModel: Model<User>
    ) {}

    async findAll() {
        const users = await this._userModel.find();

        return users;
    }

    async findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    async update(id: number, updateUserDto: CreateUserDto) {
        return `This action updates a #${id} user`;
    }

    async remove(id: number) {
        return `This action removes a #${id} user`;
    }
}