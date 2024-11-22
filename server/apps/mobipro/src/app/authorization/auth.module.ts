import { Module }                      from "@nestjs/common";
import { MongooseModule }              from '@nestjs/mongoose';
import { PassportModule }              from '@nestjs/passport';
import { JwtModule }                   from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService }    from "./auth.service";
import { AuthController } from "./auth.controller";

import { JwtStrategy } from "./jwt/jwt.strategy";

import { UserSchema }         from "../schemas/users/User.schema";
import { UserContactSchema }  from "../schemas/users/UserContact.schema";
import { RefreshTokenSchema } from "../schemas/auth/refresh-token.schema";

@Module({
    imports:     [
        ConfigModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ ConfigModule ],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET')
            }),
            inject: [ ConfigService ]
        }),
        MongooseModule.forFeature([
            { name: 'User',         schema: UserSchema },
            { name: 'UserContact',  schema: UserContactSchema },
            { name: 'RefreshToken', schema: RefreshTokenSchema }
        ])
    ],
    controllers: [ AuthController],
    providers:   [ AuthService, JwtStrategy ],
    exports:     [ JwtModule, PassportModule, JwtStrategy ]
})
export class AuthModule {}