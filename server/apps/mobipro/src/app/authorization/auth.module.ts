import { Module }                      from "@nestjs/common";
import { MongooseModule }              from '@nestjs/mongoose';
import { PassportModule }              from '@nestjs/passport';
import { JwtModule }                   from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService }    from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";

import { JwtStrategy } from "./jwt/jwt.strategy";

import { User, UserSchema }                 from "../schemas/users/User.schema";
import { UserContact, UserContactSchema }   from "../schemas/users/UserContact.schema";
import { RefreshToken, RefreshTokenSchema } from "../schemas/auth/refresh-token.schema";

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
            { name: User.name,         schema: UserSchema },
            { name: UserContact.name,  schema: UserContactSchema },
            { name: RefreshToken.name, schema: RefreshTokenSchema }
        ])
    ],
    controllers: [ AuthController],
    providers:   [ AuthService, JwtStrategy ],
    exports:     [ 
        JwtModule, PassportModule, JwtStrategy,
        MongooseModule.forFeature([ { name: UserContact.name,  schema: UserContactSchema } ])
    ]
})
export class AuthModule {}