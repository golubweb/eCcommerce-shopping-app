import { Injectable }  from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model }       from 'mongoose';

import { CreateUserDto } from './dto/CreateUser.dto';
import { User }          from '../schemas/User.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private _userModel: Model<User>
    ) {}

    async createUser(_createUserDto: CreateUserDto) {
        const user = new this._userModel(_createUserDto);
        
        console.log('Service: createUser', user);

        return user.save();
    }

    async findAll() {
        return `This action returns all users`;
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