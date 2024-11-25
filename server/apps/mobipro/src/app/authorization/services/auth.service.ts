import { HttpException, Injectable, UnauthorizedException }  from "@nestjs/common";
import { InjectModel }  from '@nestjs/mongoose';
import { JwtService }   from "@nestjs/jwt";
import { Model }        from "mongoose";
import { v4 as uuidv4 } from 'uuid';

import * as bcrypt from 'bcryptjs';

import { LoginUserDto }    from "../dtos/login.dto";
import { CreateUserDto }   from "../dtos/signupUser.dto";
import { RefreshTokenDto } from "../dtos/refresh-token.dto";

import { User }          from "../../schemas/users/User.schema";
import { UserContact }   from "../../schemas/users/UserContact.schema";
import { RefreshToken }  from "../../schemas/auth/refresh-token.schema";

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
                error:           false,
                message:         `User not found, email: ${email}`,
                userData:        null,
                token:           null,
                getRefreshToken: null
            });

        }

        let tokenData       = { accessToken: null, refreshToken: null },
            checkToken      = await this._refreshTokenModel.findOne({ userId: findUser._id }),
            isPasswordValid = await bcrypt.compare(password, findUser.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException({
                error:    false,
                message:  `Invalid password, for user: ${email}`,
                userData: null,
                token:    null
            });
        }
        
        let userData = findUser.toObject() as any;

        if (userData) {
            delete userData._id;
            delete userData.password;
            delete userData.__v;

            if (userData.contact) {
                delete userData.contact._id;
                delete userData.contact.__v;
            }
        }

        if (checkToken) {
            tokenData.refreshToken = checkToken.token;
            tokenData.accessToken  = (await this.generateUserToken(findUser._id.toString(), '2h', checkToken.token)).accessToken;

        } else {
            tokenData = await this.generateUserToken(findUser._id.toString(), '2h');
        }

        return {
            error:        false,
            message:      `User created successfully, Welcome: ${userData.displayName}`,
            userData:     userData,
            token:        tokenData.accessToken,
            refreshToken: tokenData.refreshToken
        };
    }

    async createUser({ contact, ..._createUserDto }: CreateUserDto) {
        let { email, password } = _createUserDto,
            tokenID             = null,
            findUser            = await this._userModel.findOne({ email }),
            hasedPassword       = await bcrypt.hash(password, 10);

        if (findUser) {
            throw new HttpException({
                error:        true,
                message:      `User already exists, email: ${email}`,
                userData:     null,
                token:        null,
                refreshToken: null
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

        let tokenData = await this.generateUserToken(tokenID, '2h');

        return {
            error:        false,
            message:      `User created successfully, Welcome: ${_createUserDto.displayName}`,
            userData:     populatedUser,
            token:        tokenData.accessToken,
            refreshToken: tokenData.refreshToken
        };
    }

    async refreshToken(_tokenData: RefreshTokenDto) {
        const findToken = await this._refreshTokenModel.findOne({
            token:      _tokenData.refreshToken,
            expiryDate: { $gte: new Date() }
        });

        if (!findToken) {
            throw new UnauthorizedException({
                error:        false,
                message:      `Invalid refresh token`,
                token:        null,
                userData:     null,
                refreshToken: null
            });
        }

        let tokenData = await this.generateUserToken(findToken.userId, '2h');

        return {
            accessToken:  tokenData.accessToken,
            refreshToken: tokenData.refreshToken
        }
    }

    async getRefreshToken() {
        return uuidv4();
    }

    async storeRefreshToken(_token: string, _userID: string) {
        let expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 3);

        await this._refreshTokenModel.updateOne(
            { userId: _userID }, 
            {
                token:      _token,
                expiryDate: expiryDate
            }, 
            { upsert: true }
        );
    }

    async generateUserToken(_userID: string, _expireTime: string, _refreshToken?: string) {
        const accessToken  = await this._jwtService.sign({ id: _userID }, { expiresIn: _expireTime || '1h' }),
              refreshToken = (!_refreshToken) ? await this.getRefreshToken() : _refreshToken;

        if (!_refreshToken) this.storeRefreshToken(refreshToken, _userID);

        return {
            accessToken:  accessToken,
            refreshToken: refreshToken
        }
    }
}