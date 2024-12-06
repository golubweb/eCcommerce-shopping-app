import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";

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
    async fetchPages(@Param('limit') _limit?: number, @Param('skip') _skip?: number) {
        return this._pageService.getPages(_limit, _skip);
    }

    @Get(apiRoutes.PAGES.findOne)
    async fetchPageById(@Param('id') _id: string) {
        return this._pageService.getPageById(_id);
    }

    @Delete(apiRoutes.PAGES.delete)
    @Roles(ERoles.admin)
    @UseGuards(AuthGuardUser)
    async deletePage(@Param('id') _pageId: string, @Req() _request) {
        return this._pageService.deletePage(_pageId, _request.id);
    }

    @Post(apiRoutes.PAGES.update)
    @Roles(ERoles.admin)
    @UseGuards(AuthGuardUser)
    async updatePage(@Param('id') _pageId: string, @Body() _page: CreatePageDto, @Req() _request) {
        return this._pageService.updatePage(_pageId, _page, _request.id);
    }
}