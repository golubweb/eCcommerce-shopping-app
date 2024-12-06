import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { IProduct } from "../../../interfaces/product.interface";

@Component({
    selector:    '[product-article]',
    standalone:  true,
    templateUrl: './product-article.component.html',
    styleUrls:   ['./product-article.component.scss']
})
export class ProductArticleComponent implements OnInit {
    @Input('product-data') public product!: IProduct;

    constructor(private _router: Router) {}

    ngOnInit(): void {}

    public getProductDetail(_productID: string): void {
        this._router.navigate([ 'product-page', _productID ]);
    }
}