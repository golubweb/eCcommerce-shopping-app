import { Module }         from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ProductsService }          from "./services/products.service";
import { ProductsController }       from "./controllers/products.controller";
import { Products, ProductsSchema } from "../schemas/products/Products.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Products.name, schema: ProductsSchema }
        ])
    ],
    controllers: [ ProductsController ],
    providers:   [ ProductsService ]
})
export class ProductsModule {}