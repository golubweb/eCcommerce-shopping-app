import { MongooseModule } from "@nestjs/mongoose";
import { Module }         from "@nestjs/common";
import { MailerModule }   from '@nestjs-modules/mailer';
import { ConfigService }  from '@nestjs/config';

import { UsersController } from "./controllers/users.controller";
import { UsersService }    from "./services/users.service";
import { MailService }     from "./services/mail.service";
import { AuthModule }      from "../authorization/auth.module";

import { User, UserSchema }                            from "../schemas/users/User.schema";
import { ResetPasswordTokenSchema, ResetPaswordToken } from "../schemas/users/reset-password.schema";

import mailerConfig from "../mailer/config/mailer.config";

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([
            { name: User.name,              schema: UserSchema },
            { name: ResetPaswordToken.name, schema: ResetPasswordTokenSchema }
        ]),
        MailerModule.forRootAsync({ useFactory: mailerConfig })
    ],
    providers:   [ UsersService, MailService ],
    controllers: [ UsersController ]
})
export class UsersModule {}