import { Component, OnInit } from "@angular/core";
import { RouterModule }      from "@angular/router";

import { ProductService } from "../../../services/product.service";
import { CommonModule } from "@angular/common";

@Component({
    selector:    '[front-page]',
    standalone:  true,
    imports:     [ CommonModule, RouterModule ],
    //providers:   [ ProductService ],
    templateUrl: './main-front-page.component.html',
    styleUrls:   ['./main-front-page.component.scss']
})
export class FrontPageComponent implements OnInit {
    public products: any;

    constructor(private _productService: ProductService) {}

    ngOnInit(): void {
        this.getAllProducts();
    }

    public getAllProducts(): void {
        this._productService.getAllProducts().subscribe((_products) => {
            console.log('Products: ', _products);

            if (!!_products) {
                this.products = _products
            }
        });
    }
}