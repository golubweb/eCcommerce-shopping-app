import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";

import { CreateProductDto } from "./dto/CreateProduct.dto";
import { ProductsService }  from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private _productsService: ProductsService) {}

    @Post('create')
    @UsePipes(new ValidationPipe())
    async crateProduct(@Body() _createProductDto: CreateProductDto) {
        console.log('ProductsController -> crateProduct -> _createProductDto', _createProductDto);
        return this._productsService.createProduct(_createProductDto);
    }
}