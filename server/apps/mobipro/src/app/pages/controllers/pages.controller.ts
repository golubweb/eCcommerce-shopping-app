import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";

import { Roles }         from "../../authorization/decorators/roles.decorator";
import { AuthGuardUser } from "../../authorization/guards/auth.guard";

import { ERoles }    from "../../../../../../shared/enums/role.enum";
import { apiRoutes } from "../../../../../../shared/constants/allowed-origins-urls";

import { CreatePageDto } from "../dtos/create-page.dto";
import { PagesService }  from "../services/pages.service";

@Controller(apiRoutes.PAGES.root)
export class PagesController {
    constructor(private _pageService: PagesService) {}

    @Post(apiRoutes.PAGES.create)
    @Roles(ERoles.admin)
    @UseGuards(AuthGuardUser)
    async createPage(@Body() _page: CreatePageDto, @Req() _request) {
        console.log('Controller create page: ', _page, _request.id);

        return this._pageService.createPage(_page, _request.id);
    }
    
    @Get(apiRoutes.PAGES.findAll)
    async fetchPages() {
        return this._pageService.getPages();
    }
}