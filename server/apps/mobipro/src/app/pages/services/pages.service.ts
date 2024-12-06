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

    async getPages(_limit?: number, _skip?: number) {
        let pages: Page[] = [],
            queryPage = this._pageModel.find().skip((!!_skip) ? _skip : 0);

        if (_limit !== undefined && _limit !== null) {
            queryPage = queryPage.limit(_limit);
        }

        pages = await queryPage.exec();

        return { error: false, message: (!pages.length) ? 'List of Pages' : 'Pages is empty', pagesData: pages }
    }

    async getPageById(_pageId: string) {
        let pageData: Page = await this._pageModel.findOne({ _id: _pageId, isActive: true });

        if (!pageData) {
            throw new InternalServerErrorException({ error: true, message: 'Page not found', pageData: null });
        }

        return { error: false, message: 'Page found', pageData: pageData };
    }

    async createPage(_pageData: CreatePageDto, _userId: string) {
        console.log('Create page: ', _pageData, _userId);

        let checkIsUserExists: User = await this._userModel.findOne({ _id: _userId }),
            checkIsPageExists: Page = await this._pageModel.findOne({ title: _pageData.title });

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

    async updatePage(_pageId: string, _updateData: CreatePageDto, _userId: string) {
        let checkIsUserExists: User = await this._userModel.findOne({ _id: _userId }),
            checkIsPageExists: Page = await this._pageModel.findOne({ _id: _pageId });

        if (!checkIsUserExists) {
            throw new InternalServerErrorException({ error: true, message: 'User not found', pageData: null });
        }

        if (!checkIsPageExists) {
            throw new InternalServerErrorException({ error: true, message: 'Page not found', pageData: null });
        }

        let pageUpdate = await this._pageModel.updateOne({ _id: _pageId }, { ..._updateData });

        if (!pageUpdate) {
            throw new InternalServerErrorException({ error: true, message: 'Page not updated', pageData: null });
        }

        return { error: false, message: 'Page updated', pageData: pageUpdate };
    }

    async deletePage(_pageId: string, _userId: string) {
        let checkIsUserExists: User = await this._userModel.findOne({ _id: _userId }),
            checkIsPageExists: Page = await this._pageModel.findOne({ _id: _pageId });

        if (!checkIsUserExists) {
            throw new InternalServerErrorException({ error: true, message: 'User not found', pageData: null });
        }

        if (!checkIsPageExists) {
            throw new InternalServerErrorException({ error: true, message: 'Page not found', pageData: null });
        }

        let pageDelete = await this._pageModel.updateOne({ _id: _pageId }, { isActive: false });

        return { error: false, message: `Page deleted, Title: ${checkIsPageExists.title}, ID: ${checkIsPageExists._id}`, pageData: null };
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