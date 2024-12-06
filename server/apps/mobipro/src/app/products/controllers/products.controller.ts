import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";

import { CreateProductDto } from "../dto/CreateProduct.dto";
import { ProductsService }  from "../services/products.service";

import { apiRoutes } from "../../../../../../shared/constants/allowed-origins-urls";

@Controller(apiRoutes.PRODUCTS.root)
export class ProductsController {
    constructor(private _productsService: ProductsService) {}

    @Post(apiRoutes.PRODUCTS.create)
    @UsePipes(new ValidationPipe())
    async crateProduct(@Body() _createProductDto: CreateProductDto) {
        return this._productsService.createProduct(_createProductDto);
    }

    @Get(apiRoutes.PRODUCTS.all)
    @Throttle({ default: { limit: 3, ttl: 2000 } })
    @UsePipes(new ValidationPipe())
    async getAllProducts(@Param('limit') _limit?: number, @Param('skip') _skip?: number) {
        return this._productsService.getAllProducts(_limit, _skip);
    }

    @Get(apiRoutes.PRODUCTS.findOne)
    @UsePipes(new ValidationPipe())
    async getProductById(@Param('id') _id: string) {
        console.log('Product Controller => getProductById: ', _id);
        
        return this._productsService.getProductById(_id);
    }
}