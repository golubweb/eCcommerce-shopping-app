import { Injectable, InternalServerErrorException }  from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model }       from "mongoose";

import { CreatePageDto } from "../dtos/create-page.dto";
import { Page }          from "../../schemas/pages/pages.schemas";
import { User } from "../../schemas/users/User.schema";

@Injectable()
export class PagesService {
    constructor(
        @InjectModel(User.name) private _userModel: Model<User>,
        @InjectModel(Page.name) private _pageModel: Model<Page>
    ) {}

    async getPages() {
        let pages = await this._pageModel.find();

        if (!pages.length) {
            return { error: true, message: 'Pages is empty', pagesData: pages };
        }

        return { error: true, message: 'User not found', pagesData: pages }
    }

    async getPageById() {
        return {};
    }

    async createPage(_pageData: CreatePageDto, _userId: string) {
        console.log('Create page: ', _pageData, _userId);

        let checkIsUserExists = await this._userModel.findOne({ _id: _userId }),
            checkIsPageExists = await this._pageModel.findOne({ title: _pageData.title });

        if (!checkIsUserExists) {
            throw new InternalServerErrorException({ error: true, message: 'User not found', pageData: null });
        }

        if (checkIsPageExists) {
            throw new InternalServerErrorException({ error: true, message: 'Page already exists', pageData: null });
        }

        let pageData = await this._pageModel.create({ ..._pageData, whoCreated: _userId });

        if (!pageData) {
            throw new InternalServerErrorException({ error: true, message: 'Page not created', pageData: null });
        }

        console.log('Page data: ', pageData);

        return { error: false, message: 'Page created', pageData: pageData };
    }

    async updatePage() {
        return {};
    }

    async deletePage() {
        return {};
    }

    async getPagesByUserId() {
        return [];
    }

    async getPagesByCategory() {
        return [];
    }

    async getPagesByTag() {
        return [];
    }

    async getPagesBySearch() {
        return [];
    }

    async getPagesByFilters() {
        return [];
    }

    async getPagesByFiltersAndSearch() {
        return [];
    }

    async getPagesByFiltersAndSearchAndCategory() {
        return [];
    }

    async getPagesByFiltersAndSearchAndTag() {
        return [];
    }
}