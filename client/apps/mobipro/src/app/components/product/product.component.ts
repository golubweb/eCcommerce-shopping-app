import { Component, Input, OnInit } from "@angular/core";

import { IProduct } from "../../interfaces/product.interface";

@Component({
    selector:    '[single-product-article]',
    standalone:  true,
    templateUrl: './product.component.html',
    styleUrls:   ['./product.component.scss']
})
export class SingleProductArticleComponent implements OnInit {
    @Input('product-data') public product!: IProduct;

    constructor() {}

    ngOnInit(): void {
        console.log('Product component', this.product);
    }

    public getProductDetail(_productID: string): void {
        console.log('Product ID: ', _productID);
    }
}