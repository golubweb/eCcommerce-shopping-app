import { HttpException, Injectable }  from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model }       from "mongoose";

import { CreateProductDto } from "../dto/CreateProduct.dto";
import { Products }         from "../../schemas/products/Products.schema";
import { error } from "console";

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

    async getAllProducts(_limit?: number, _skip?: number) {
        let products: Products[] = [],
            queryProducts = this._productsModel.find().skip((!!_skip) ? _skip : 0);

        if (_limit !== undefined && _limit !== null) {
            queryProducts = queryProducts.limit(_limit);
        }

        products = await queryProducts.exec();

        return { error: false, message: (!products.length) ? 'List of Products' : 'Product is empty', productsData: products };
    }

    async getProductById(_productID: string) {
        console.log('SERVICE: ', _productID);
        let findProduct = await this._productsModel.findOne({ _id: _productID });

        console.log('Product Service => getProductById: ', findProduct);

        if (!findProduct || !findProduct.isActive) {
            throw new HttpException({ error: false, message: 'Product not found!!!', product: null }, 404);
        }

        return { error: false, message: 'Product found', product: findProduct };
    }
}