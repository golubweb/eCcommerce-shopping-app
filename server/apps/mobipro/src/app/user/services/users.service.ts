import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model }       from 'mongoose';

import * as bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

import { CreateUserDto }     from '../../authorization/dtos/signupUser.dto';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { User }              from '../../schemas/users/User.schema';
import { ResetPaswordToken } from '../../schemas/users/reset-password.schema';
import { MailService }       from './mail.service';

@Injectable()
export class UsersService {
    constructor(
        private _mailerService: MailService,
        @InjectModel(User.name)              private _userModel:       Model<User>,
        @InjectModel(ResetPaswordToken.name) private _resetTokenModel: Model<ResetPaswordToken>
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