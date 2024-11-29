import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";

import { CreateProductDto } from "../dto/CreateProduct.dto";
import { ProductsService }  from "../services/products.service";

@Controller('products')
export class ProductsController {
    constructor(private _productsService: ProductsService) {}

    @Post('create')
    @UsePipes(new ValidationPipe())
    async crateProduct(@Body() _createProductDto: CreateProductDto) {
        return this._productsService.createProduct(_createProductDto);
    }

    @Get('all')
    @Throttle({ default: { limit: 3, ttl: 2000 } })
    @UsePipes(new ValidationPipe())
    async getAllProducts() {
        return this._productsService.getAllProducts();
    }

    @Get(':id')
    @UsePipes(new ValidationPipe())
    async getProductById(@Param('id') _id: string) {
        console.log('Product Controller => getProductById: ', _id);
        return this._productsService.getProductById(_id);
    }
}