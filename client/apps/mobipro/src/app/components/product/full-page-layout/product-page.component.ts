import { Component, OnInit }  from "@angular/core";
import { CommonModule }       from "@angular/common";
import { Router }             from "@angular/router";
import { provideStore }       from "@ngrx/store";
import { provideEffects }     from "@ngrx/effects";

import { ProductService } from "../../../services/product.service";
import { IProduct }       from "../../../interfaces/product.interface";
import { ProductReducer } from "../../../store/product/product.reducer";
import { ProductEffects } from "../../../store/product/product.effects";

@Component({
    selector:    '[product-page]',
    standalone:  true,
    imports:     [ 
        CommonModule
    ],
    /*providers:   [ 
        provideStore({ product: ProductReducer }),
        provideEffects([ ProductEffects ])
    ],*/
    templateUrl: './product-page.component.html',
    styleUrls:   ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
    public product: IProduct | null = null;

    constructor(
        private _router:         Router,
        private _productService: ProductService
    ) {}

    ngOnInit(): void {
        console.log('Product Page component');

        this.getProductID();
    }

    public getProductID(): void {
        let productID: string = this._router.url.split('/')[2];;

        this.getProductDetail(productID);
    }

    public getProductDetail(_productID: string): void {
        console.log('Product ID: ', _productID);

        this._productService.getProductByID(_productID).subscribe((_response: { error: boolean; message: string; product: IProduct }) => {
            console.log('Product: ', _response);

            if (!_response.error) {
                this.product = _response.product;
            }
        });
    }

    public addToCart(_productID: string): void {
        console.log('Add to cart');
    }
}