import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy }                  from "@nestjs/passport";
import { InjectModel }                       from "@nestjs/mongoose";
import { ConfigService }                     from '@nestjs/config';
import { Model }                             from "mongoose";
import { ExtractJwt, Strategy }              from "passport-jwt";

import { User } from "../../schemas/users/User.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private _configService: ConfigService,
        @InjectModel('User') private _userModel: Model<User>
    ) {
        console.log('JWT_SECRET 1111:', _configService.get('JWT_SECRET'));

        super({
            jwtFromRequest:   ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:      _configService.get('JWT_SECRET'),
            ignoreExpiration: false
        })
    }

    async validate(payload: { id: string }) {
        const { id } = payload;

        console.log('Payload: ', id);

        const user = await this._userModel.findOne({ _id: id });

        console.log('Ima li user: ', user);

        if(!user) {
            throw new UnauthorizedException('Unauthorized access, please login');
        }

        return user;
    }
}