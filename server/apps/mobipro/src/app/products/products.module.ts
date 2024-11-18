import { Module }         from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ProductsService }    from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsSchema }     from "../schemas/products/Products.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Products', schema: ProductsSchema }
        ])
    ],
    controllers: [ ProductsController ],
    providers:   [ ProductsService ]
})
export class ProductsModule {}