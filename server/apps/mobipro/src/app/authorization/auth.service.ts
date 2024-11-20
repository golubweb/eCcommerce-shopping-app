import { HttpException, Injectable }  from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { JwtService }  from "@nestjs/jwt";
import { Model }       from "mongoose";

import * as bcrypt from 'bcryptjs';

import { LoginUserDto }  from "./dtos/login.dto";
import { CreateUserDto } from "./dtos/signupUser.dto";
import { User }          from "../schemas/users/User.schema";
import { UserContact } from "../schemas/users/UserContact.schema";

@Injectable()
export class AuthService {
    constructor(
        private _jwtService: JwtService,
        @InjectModel(User.name)        private _userModel:        Model<User>,
        @InjectModel(UserContact.name) private _userContactModel: Model<UserContact>
    ) {}

    async loginUser(_loginUserDto: LoginUserDto) {
        return 'Login user';
    }

    async createUser({ contact, ..._createUserDto }: CreateUserDto) {
        const { email, name, lastname, password } = _createUserDto;

        let findUser      = await this._userModel.findOne({ name, lastname, email }),
            hasedPassword = await bcrypt.hash(password, 10);

        if (findUser) {
            throw new HttpException({
                error:    true,
                message:  'User already exists',
                userData: null,
                token:    null
            }, 404);
        }

        const newUserContact = await new this._userContactModel(contact).save(),
              newUser        = await this._userModel.create({ ..._createUserDto, contact: newUserContact._id }).then((_userData: any) => {
            _userData = _userData.toObject();
            
            delete _userData.password;
            //delete _userData._id;
            delete _userData.isActive;
            delete _userData.createdAt;
            delete _userData.updatedAt;
            delete _userData.__v;

            return _userData;
        });

        const populatedUser = await this._userModel.findById(newUser._id).populate('contact');

        return {
            error:    false,
            message:  'User created successfully', 
            userData: populatedUser,
            token:    this._jwtService.sign({ id: newUser._id })
        };
    }
}