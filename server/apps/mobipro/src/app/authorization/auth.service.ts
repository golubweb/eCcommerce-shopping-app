import { HttpException, Injectable }  from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { JwtService }  from "@nestjs/jwt";
import { Model }       from "mongoose";

import * as bcrypt from 'bcryptjs';

import { LoginUserDto }  from "./dtos/login.dto";
import { CreateUserDto } from "./dtos/signupUser.dto";
import { User }          from "../schemas/users/User.schema";
import { UserContact }   from "../schemas/users/UserContact.schema";

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

        let newUserContact = await new this._userContactModel(contact).save(),
            newUser        = await this._userModel.create({ ..._createUserDto, password: hasedPassword, contact: newUserContact._id });

        let token         = this._jwtService.sign({ id: newUser._id }),
            populatedUser = await this._userModel.findById(newUser._id).populate('contact').then((_populatedUser: any) => {
                _populatedUser = _populatedUser.toObject();

                delete _populatedUser._id;
                delete _populatedUser.password;
                delete _populatedUser.createdAt;
                delete _populatedUser.updatedAt;
                delete _populatedUser.__v;
                delete _populatedUser.contact._id;
                delete _populatedUser.contact.__v;

                return _populatedUser;
            });

        console.log('populatedUser: ', populatedUser);

        return {
            error:    false,
            message:  'User created successfully', 
            userData: populatedUser,
            token:    token
        };
    }
}