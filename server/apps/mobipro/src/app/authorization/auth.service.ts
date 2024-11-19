import { HttpException, Injectable }  from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { JwtService }  from "@nestjs/jwt";
import { Model }       from "mongoose";

import * as bcrypt from 'bcryptjs';

import { LoginUserDto }  from "./dto/login.dto";
import { CreateUserDto } from "./dto/signupUser.dto";
import { User }          from "../schemas/users/User.schema";

@Injectable()
export class AuthService {
    constructor(
        private _jwtService: JwtService,
        @InjectModel(User.name) private _userModel: Model<User>
    ) {}

    async loginUser(_loginUserDto: LoginUserDto) {
        return 'Login user';
    }

    async createUser(_createUserDto: CreateUserDto) {
        const { email, name, lastname, password } = _createUserDto;

        let findUser      = await this._userModel.findOne({ name, lastname, email }),
            hasedPassword = await bcrypt.hash(password, 10);

        if (findUser) {
            throw new HttpException('User already exists', 404);
        }

        const newUser = await this._userModel.create({
            ..._createUserDto,
            isNewUser: true,
            password: hasedPassword
        });

        let token       = this._jwtService.sign({ id: newUser._id }),
            resUserData = newUser.toObject();

        delete resUserData.password;
        delete resUserData._id;
        delete resUserData.isActive;
        
        console.log('Service: createUser', newUser);

        return {
            message: 'User created successfully', 
            user:    resUserData,
            token:   token
        };
    }
}