import { HttpException, Injectable }  from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model }       from "mongoose";

import { CreateProductDto } from "../dto/CreateProduct.dto";
import { Products }         from "../../schemas/products/Products.schema";

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Products.name) private _productsModel: Model<Products>) {}

    async createProduct(_createProductDto: CreateProductDto) {
        let product = await this._productsModel.findOne({ name: _createProductDto.name });

        if (product) {
            throw new HttpException('Product already exists', 404);
        }

        let newProduct = new this._productsModel(_createProductDto);

        return newProduct.save();
    }

    async getAllProducts() {
        return this._productsModel.find();
    }
}