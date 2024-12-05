import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AuthModule }       from "../authorization/auth.module";
import { PagesService }     from "./services/pages.service";
import { PagesController }  from "./controllers/pages.controller";
import { Page, PageSchema } from "../schemas/pages/pages.schemas";

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([
            { name: Page.name, schema: PageSchema }
        ])
    ],
    providers:   [ PagesService ],
    controllers: [ PagesController ],
    exports:     [ ]
})
export class PagesModule {}