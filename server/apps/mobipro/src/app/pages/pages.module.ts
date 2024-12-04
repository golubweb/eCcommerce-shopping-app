import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AuthModule }      from "../authorization/auth.module";
import { PagesService }    from "./services/pages.service";
import { PagesController } from "./controllers/pages.controller";

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([
            //{ name: Page.name, schema: PageSchema }
        ])
    ],
    providers:   [ PagesService ],
    controllers: [ PagesController ],
    exports:     [ ]
})
export class PagesModule {}