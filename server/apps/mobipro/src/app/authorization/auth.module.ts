import { Module }                from "@nestjs/common";
import { MongooseModule }        from '@nestjs/mongoose';
import { PassportModule }        from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService }    from "./auth.service";
import { AuthController } from "./auth.controller";

import { UserSchema }  from "../schemas/users/User.schema";
import { JwtStrategy } from "./jwt/jwt.strategy";

@Module({
    imports:     [
        ConfigModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ ConfigModule ],
            useFactory: async (configService: ConfigService) => {
                const secret = configService.get<string>('JWT_SECRET');
                console.log('JWT_SECRET_AUTH_MODULES:', secret); // Logovanje za proveru

                return {
                  secret,
                  signOptions: { expiresIn: '60s' },
                };
            },
            inject: [ ConfigService ]
        }),
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema }
        ])
    ],
    controllers: [ AuthController],
    providers:   [ AuthService, JwtStrategy ],
    exports:     [ JwtModule, PassportModule, JwtStrategy ]
})
export class AuthModule {}