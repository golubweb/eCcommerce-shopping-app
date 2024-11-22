import { HttpException, Injectable, UnauthorizedException }  from "@nestjs/common";
import { InjectModel }  from '@nestjs/mongoose';
import { JwtService }   from "@nestjs/jwt";
import { Model }        from "mongoose";
//import { v4 as uuidv4 } from 'uuid';

import * as bcrypt from 'bcryptjs';

import { LoginUserDto }  from "./dtos/login.dto";
import { CreateUserDto } from "./dtos/signupUser.dto";

import { User }          from "../schemas/users/User.schema";
import { UserContact }   from "../schemas/users/UserContact.schema";
import { RefreshToken }  from "../schemas/auth/refresh-token.schema";

@Injectable()
export class AuthService {
    constructor(
        private _jwtService: JwtService,
        @InjectModel(User.name)         private _userModel:         Model<User>,
        @InjectModel(UserContact.name)  private _userContactModel:  Model<UserContact>,
        @InjectModel(RefreshToken.name) private _refreshTokenModel: Model<RefreshToken>
    ) {}

    async loginUser(_loginUserDto: LoginUserDto) {
        const { email, password } = _loginUserDto;

        const findUser = await this._userModel.findOne({ email }).populate('contact');

        if (!findUser) {
            throw new UnauthorizedException({
                error:    false,
                message:  `User not found, email: ${email}`,
                userData: null,
                token:    null
            });
        }

        let isPasswordValid = await bcrypt.compare(password, findUser.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException({
                error:    false,
                message:  `Invalid password, for user: ${email}`,
                userData: null,
                token:    null
            });
        }

        return {
            error:    false,
            message:  `User created successfully, Welcome: ${findUser.displayName}`,
            userData: findUser,
            token:    (await this.generateUserToken(findUser._id.toString(), '2h')).accessToken
        };
    }

    async createUser({ contact, ..._createUserDto }: CreateUserDto) {
        let { email, password } = _createUserDto,
            tokenID             = null,
            findUser            = await this._userModel.findOne({ email }),
            hasedPassword       = await bcrypt.hash(password, 10);

        if (findUser) {
            throw new HttpException({
                error:    true,
                message:  `User already exists, email: ${email}`,
                userData: null,
                token:    null
            }, 404);
        }

        let newUserContact = await new this._userContactModel(contact).save(),
            populatedUser  = await this._userModel.create({ ..._createUserDto, password: hasedPassword, contact: newUserContact._id }).then((_newUser: any) => {
                tokenID = _newUser._id;

                return this._userModel.findById(_newUser._id).populate('contact').then((_populatedUser: any) => {
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
            });

        return {
            error:    false,
            message:  `User created successfully, Welcome: ${_createUserDto.displayName}`,
            userData: populatedUser,
            token:    (await this.generateUserToken(tokenID, '2h')).accessToken
        };
    }

    async getRefreshToken(_token: string) {
        //const refreshToken = uuidv4();
    }

    async generateUserToken(_ID: string, _expireTime: string) {
        const accessToken = this._jwtService.sign({ id: _ID }, { expiresIn: _expireTime || '1h' });

        return { accessToken };
    }
}