import { Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model }       from 'mongoose';

import * as bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

import { User }              from '../../schemas/users/User.schema';
import { ResetPaswordToken } from '../../schemas/users/reset-password.schema';
import { UserContact }       from '../../schemas/users/UserContact.schema';
import { RefreshToken }      from '../../schemas/auth/refresh-token.schema';

import { MailService }       from './mail.service';

import { ChangePasswordDto } from '../dtos/change-password.dto';
import { UpdateUserDto }     from '../dtos/update-user.dto';

import { ERoles } from 'shared/enums/role.enum';

@Injectable()
export class UsersService {
    constructor(
        private _mailerService: MailService,
        @InjectModel(User.name)              private _userModel:         Model<User>,
        @InjectModel(UserContact.name)       private _userContactModel:  Model<UserContact>,
        @InjectModel(ResetPaswordToken.name) private _resetTokenModel:   Model<ResetPaswordToken>,
        @InjectModel(RefreshToken.name)      private _refreshTokenModel: Model<RefreshToken>
    ) {}

    async findAll() {
        return await this._userModel.find().select([ '-password', '-__v', '-createdAt', '-updatedAt' ]).populate('contact');
    }

    async findOne(_userID: string, _token: string, _refreshToken: string) {
        console.log('Find one: ', _userID, _refreshToken);

        const findToken = await this._refreshTokenModel.findOne({
            userId:     _userID,
            token:      _refreshToken,
            expiryDate: { $gte: new Date() }
        });

        if (!findToken) throw new UnauthorizedException({ error: true, message: 'Invalid refreshToken token' });

        let findUser = await this._userModel.findById(_userID).select([ '-password', '-__v', '-createdAt', '-updatedAt' ]).populate('contact');

        return { error: false, message: 'Request Successed', userData: findUser, token: _token, refreshToken: findToken.token }; 
    }

    async updateUserData(_userID: string, _updateUser: UpdateUserDto) {
        let existingUser                    = await this._userModel.findOne({ email: _updateUser.email }).select('_id'),
            { contact, ...updatedUserData } = _updateUser;

        if (existingUser && existingUser._id.toString() !== _userID) {
            throw new InternalServerErrorException({ error: true, message: 'Email already exists, not some user!' });
        }

        let findUser = await this._userModel.findByIdAndUpdate(_userID, updatedUserData);
        
        if (!findUser)          throw new NotFoundException({ error: true, message: 'User not found' });
        if (!!findUser.contact) await this._userContactModel.findByIdAndUpdate(findUser.contact.toString(), contact);

        return { error: false, message: 'User updated' };
    }

    async removeUser(_userID: string, _adminID: string, _userRole: ERoles[]) {
        let findUser = await this._userModel.findById(_userID);

        console.log('IF: ', _userRole, ERoles.admin, !_userRole.includes(ERoles.admin));

        if (!findUser)                         throw new NotFoundException({            error: true, message: "Cannot remove user because User doesn't exist" });
        if (!_userRole.includes(ERoles.admin)) throw new UnauthorizedException({        error: true, message: 'You are not authorized to remove user' });
        if (findUser.isActive === false)       throw new InternalServerErrorException({ error: true, message: 'User is already removed' });

        await this._userModel.updateOne({ _id: _userID }, { isActive: false });

        return { error: false, message: `User removed: name: ${findUser.name}, lastname: ${findUser.lastname}, email: ${findUser.email}` };
    }

    async changePassword(_userId: string, _credentials: ChangePasswordDto) {
        let hashedPassword:  string  = null,
            isPasswordValid: boolean = false,
            findUser:        User    = await this._userModel.findById(_userId);

        if (!findUser) throw new NotFoundException({ error: true, message: 'User not found' });

        isPasswordValid = bcrypt.compareSync(_credentials.oldPassword, findUser.password);

        console.log('Is password valid: ', isPasswordValid);

        if (!isPasswordValid) throw new UnauthorizedException({ error: true, message: 'Invalid password'});

        hashedPassword = await bcrypt.hash(_credentials.newPassword, 10);

        await this._userModel.updateOne({ _id: _userId }, { password: hashedPassword });

        return { error: false,  message: 'Password changed' };
    }

    async forgotPassword(_email: string) {
        let findUser = await this._userModel.findOne({ email: _email }),
            expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 3);

        if (findUser) {
            let resetToken: string = nanoid(64);
            
            console.log('findUser: ', findUser._id);

            await this._resetTokenModel.updateOne(
                { userId: findUser._id },
                { 
                    token:      resetToken,
                    expiryDate: expiryDate
                },
                { upsert: true }
            );

            this._mailerService.sendResetPasswordEmail(findUser.email, resetToken);
        }

        return { error: false, message: 'If this user exist, they will receive an email' };
    }

    async resetPassword(_resetToken: string, _newPassword: string) {
        let token = await this._resetTokenModel.findOneAndDelete({ 
            token:      _resetToken,
            expiryDate: { $gte: new Date() }
        });

        if (!token) throw new UnauthorizedException({ error: true, message: 'Invalid token' });

        let userData: User = await this._userModel.findById(token.userId);

        if (!userData) throw new InternalServerErrorException({ error: true, message: 'User not found' });

        userData.password = await bcrypt.hash(_newPassword, 10);
        await userData.save();

        return { error: false, message: 'Password reset' };
    }
}