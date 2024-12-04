import { Controller, Post } from "@nestjs/common";


@Controller('pages')
export class PagesController {

    @Post()
    async createPage() {
        return {};
    }
}