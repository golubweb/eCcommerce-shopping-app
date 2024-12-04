import { Injectable } from "@nestjs/common";

@Injectable()
export class PagesService {
    constructor() {}

    async getPages() {
        return [];
    }

    async getPageById() {
        return {};
    }

    async createPage() {
        return {};
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