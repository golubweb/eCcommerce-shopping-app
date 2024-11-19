import { MongooseModule } from "@nestjs/mongoose";
import { Module }         from "@nestjs/common";

import { UserSchema }      from "../schemas/users/User.schema";
import { UsersController } from "./users.controller";
import { UsersService }    from "./users.service";
import { AuthModule }      from "../authorization/auth.module";

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([
            { name: 'User',    schema: UserSchema },
            //{ name: 'Contact', schema: ContactSchema }
        ]),
    ],
    providers: [ UsersService ],
    controllers: [ UsersController ]
})
export class UsersModule {}